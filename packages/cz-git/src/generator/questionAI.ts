/**
 * @description (Main: `generateAIPrompt`) - Generate AI returns a single or multiple messages in the Terminal display
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

import { fuzzyFilter, style } from '@cz-git/inquirer'
import type { CommitizenGitOptions, CommitizenType } from '../shared'
import { isString, parseStandardScopes } from '../shared'
import { generateAISubjects } from './message'
import { generateQuestions } from './question'

export async function generateAIPrompt(options: CommitizenGitOptions, cz: CommitizenType) {
    console.log(style.green('ℹ'), style.bold(options.messages!.generatingByAI!))
    let subjects: string[]
    try {
        subjects = await generateAISubjects({}, options)
    }
    catch {
        // Do not print provider errors: they may include credentials or the diff.
        subjects = []
    }
    const allowedTypes = new Set(options.types?.concat(options.typesAppend || []).map(t => t.value))
    const candidates = subjects.filter((s) => {
        const match = /^([^:()\s]+): .+$/.exec(s)
        return !!match && allowedTypes.has(match[1]!)
    })
    if (!candidates.length) {
        console.log(style.yellow('No AI subjects available; enter a message manually.'))
        return cz.prompt(generateQuestions(options, cz))
    }

    const selected = candidates.length === 1
        ? candidates[0]!
        : (await cz.prompt(generateAISubjectsQuestions(options, candidates))).subject!
    const [, type, subject] = /^([^:()\s]+): (.+)$/.exec(selected)!
    const answers = { type, subject }
    if (isString(options.defaultScope) && options.defaultScope)
        Object.assign(answers, { scope: options.defaultScope })
    return answers
}

function generateAISubjectsQuestions(options: CommitizenGitOptions, subjects: string[]) {
    return [
        {
            type: 'search-list',
            name: 'subject',
            message: options.messages?.generatedSelectByAI,
            themeColorCode: options?.themeColorCode,
            source: (_: unknown, input: string) => {
                return fuzzyFilter(input, parseStandardScopes(subjects))
            },
        },
    ]
}
