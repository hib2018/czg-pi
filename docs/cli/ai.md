# czg ai (Pi SDK)

This fork uses your existing Pi model and authentication. Requires Node.js 22.19+ and a configured Pi installation; no additional OpenAI key or gateway is needed. Pi may contact your selected cloud model.

```sh
git add <files>
czg ai                 # one suggested subject
czg ai -N=3            # choose among up to three subjects
```

Only the staged diff is sent to Pi (up to 7,800 characters). The AI session has no tools, extensions, or saved transcript. If there is no staged diff or generation fails, the usual manual questions appear. Generated subjects use the existing selection and edit/confirmation prompts; review or edit the message before choosing **Yes**. No commit is made by the AI itself. Even if `skipQuestions` contains `confirmCommit`, AI mode still requires confirmation.

The old OpenAI API configuration and `-M` / `--ai-model` settings do not control Pi in this fork. Choose a model and authenticate using Pi's own configuration before running `czg ai`.
