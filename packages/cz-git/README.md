# cz-git adapter in czg-pi

This adapter is part of [czg-pi](https://github.com/hib2018/czg-pi), a fork of [cz-git](https://github.com/Zhengqbbb/cz-git). It retains the interactive Commitizen adapter and replaces AI subject generation with a Pi SDK session that uses Pi's configured model and authentication. Node.js 22.19+ is required.

`czg ai` sends staged changes to Pi and passes candidates to the existing selection and confirmation prompts. When generation is unavailable, the usual manual questions remain available. Build and run instructions are in the [project README](https://github.com/hib2018/czg-pi#readme).

The upstream `cz-git` npm package is **not** a release of this fork. Derived from cz-git by Qiubin Zheng and contributors. MIT; see [LICENSE](LICENSE).
