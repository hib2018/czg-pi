# czg CLI in czg-pi

This is the interactive CLI of [czg-pi](https://github.com/hib2018/czg-pi), a fork of [cz-git](https://github.com/Zhengqbbb/cz-git). It uses Pi's configured model and authentication to suggest commit subjects; no separate OpenAI key is required. Requires Node.js 22.19+.

This fork has **not** been published as the upstream `czg` npm package. Build from the repository root with `corepack pnpm install && corepack pnpm build`, then run from the Git repository you want to commit in:

```sh
git add <files>
node /path/to/czg-pi/packages/cli/bin/index.js ai -N=3
```

The candidate is selected, editable, and confirmed in the existing CLI. Without a staged diff, or if Pi fails, you can enter the message manually. See the [project README](https://github.com/hib2018/czg-pi#readme) and [AI guide](https://github.com/hib2018/czg-pi/blob/main/docs/cli/ai.md) for details.

Derived from cz-git by Qiubin Zheng and contributors. MIT; see [LICENSE](LICENSE).
