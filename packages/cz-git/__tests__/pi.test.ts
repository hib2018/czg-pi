import { spawnSync } from 'node:child_process'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { generateAISubjects } from '../src/generator/message'
import { generatePiSubjects } from '../src/generator/pi'
import { generateAIPrompt } from '../src/generator/questionAI'

vi.mock('node:child_process', () => ({ spawnSync: vi.fn() }))
const prompt = vi.fn()
const dispose = vi.fn()
const session = {
    prompt,
    dispose,
    messages: [{ role: 'assistant', stopReason: 'stop' }],
    getLastAssistantText: vi.fn(),
}
const createAgentSession = vi.fn(async (_options: unknown) => ({ session }))
const loader = vi.fn()
vi.mock('@earendil-works/pi-coding-agent', () => ({
    createAgentSession: (options: unknown) => createAgentSession(options),
    DefaultResourceLoader: class {
        constructor(options: unknown) { loader(options) }
    },
    getAgentDir: () => '/fake/pi',
    SessionManager: { inMemory: vi.fn(() => 'memory') },
}))

beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(spawnSync).mockReturnValue({ stdout: 'staged diff', status: 0 } as any)
    session.getLastAssistantText.mockReturnValue('1. add staged feature\n2. fix staged bug')
})

describe('Pi subject generation', () => {
    it('sends only the staged diff and reuses the normal candidate flow', async () => {
        const options = { aiNumber: 2 } as any
        expect(await generateAISubjects({ type: 'feat' }, options)).toEqual(['add staged feature', 'fix staged bug'])
        expect(spawnSync).toHaveBeenCalledWith('git', ['diff', '--cached', '.'], { encoding: 'utf8' })
        expect(prompt.mock.calls[0][0]).toContain('staged diff')
        expect(createAgentSession).toHaveBeenCalledWith(expect.objectContaining({ noTools: 'all', sessionManager: 'memory' }))
        expect(loader).toHaveBeenCalledWith(expect.objectContaining({ noExtensions: true, noContextFiles: true, noSkills: true }))
        expect(dispose).toHaveBeenCalledOnce()
    })

    it('does not open Pi if there is no staged diff', async () => {
        vi.mocked(spawnSync).mockReturnValue({ stdout: '', status: 0 } as any)
        expect(await generateAISubjects({ type: 'feat' }, {})).toEqual([])
        expect(createAgentSession).not.toHaveBeenCalled()
    })

    it('rejects incomplete or unsafe output and disposes the session', async () => {
        session.getLastAssistantText.mockReturnValue('\u001B[31munsafe\n\n')
        expect(await generatePiSubjects({} as any, 'diff')).toEqual([])
        expect(dispose).toHaveBeenCalledOnce()
    })

    it('falls back to manual questions on generation failure', async () => {
        createAgentSession.mockRejectedValueOnce(new Error('private provider error'))
        const cz = { prompt: vi.fn().mockResolvedValueOnce({ type: 'feat' }).mockResolvedValueOnce({ type: 'feat', subject: 'manual' }) }
        const log = vi.spyOn(console, 'log').mockImplementation(() => {})
        try {
            expect(await generateAIPrompt({ types: [{ name: 'feat', value: 'feat' }], messages: {} } as any, cz as any))
                .toEqual({ type: 'feat', subject: 'manual' })
            expect(cz.prompt).toHaveBeenCalledTimes(2)
            expect(log.mock.calls.flat().join(' ')).not.toContain('private provider error')
        }
        finally {
            log.mockRestore()
        }
    })
})
