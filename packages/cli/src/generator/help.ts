import process from 'node:process'
import { style } from 'cz-git'

/** `czg` help document */
export function generateHelp(version: string, code = 0) {
    // prettier-ignore
    console.log(
        `${style.yellow('NAME:')}
    ${style.green('czg')} - Interactive Commitizen CLI that generate standardized git commit message

${style.yellow('WEBSITE:')}
    ${style.underline('https://cz-git.qbb.sh/cli/')}
    ${style.underline('https://github.com/Zhengqbbb/cz-git')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    czg [subcommand...] [options...] [git-commit-options...]

${style.yellow('SUBCOMMAND:')}
    ${style.cyan('ai')}               ${style.red('Generate subject with Pi (Node.js 22.19+)')}
    ${style.cyan('break')}            ${style.red('Turn on appends a ! after the type/scope')}
    ${style.cyan('emoji')}            ${style.red('Turn on output message with emoji mode')}
    ${style.cyan('checkbox')}         ${style.red('Turn on scope checkbox mode')}
    ${style.cyan('gpg')}              ${style.red('Turn on use GPG sign commit message')}

${style.yellow('OPTIONS:')}
    ${style.cyan(':, --alias=')}      ${style.red('Directly submit the defined commit message')}
    ${style.cyan('--config=')}        ${style.red('Specify the configuration file to use')}

  ${style.gray('Pi AI (uses the model and authentication configured in Pi):')}
    ${style.cyan('-N=,--ai-num=')}    ${style.red('Request up to N subjects (maximum 10) and choose one')}

${style.yellow('FLAG:')}
    ${style.cyan('-r, --retry')}      ${style.red('Directly retry submit by the last message')}
    ${style.cyan('--no-ai')}          ${style.red('Turn off AI prompt mode in this session')}
    ${style.cyan('-h, --help')}       ${style.red('Show help')}
    ${style.cyan('-v, --version')}    ${style.red('Show version')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('czg')}
    ${style.cyan('czg emoji')}
    ${style.cyan('czg :fd')}
    ${style.cyan('czg --config="./config/cz.json"')}
    ${style.cyan('git add <files> && czg ai -N=3')}

Extends 'git commit' options.
See 'git commit --help' for more information. `,
    )
    process.exit(code)
}
