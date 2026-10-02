# czg-pi

[cz-git](https://github.com/Zhengqbbb/cz-git) をベースに、`czg ai` のコミット件名生成を [Pi SDK](https://www.npmjs.com/package/@earendil-works/pi-coding-agent) に切り替えた派生版です。Pi で設定済みのモデルと認証を利用するため、cz-git 用の OpenAI キーや Gateway は不要です。選択したクラウドモデルとの通信は発生し得ます。

**上流の公式リリースではありません。** npm の `czg` / `cz-git` パッケージや上流サイトは、この派生版の配布物ではありません。

## 必要なもの

- Node.js 22.19 以降、pnpm 10.33.2
- Pi 側で設定済みのモデルと認証
- Git

## ローカルでビルド

```sh
git clone https://github.com/hib2018/czg-pi.git
cd czg-pi
corepack pnpm install
corepack pnpm build
```

コミットしたいリポジトリに移動し、変更をステージしてから実行します。

```sh
cd /path/to/your/repository
git add <files>
node /path/to/czg-pi/packages/cli/bin/index.js ai
# 候補を最大3件生成する場合
node /path/to/czg-pi/packages/cli/bin/index.js ai -N=3
```

Pi に渡すのはステージ済み差分の先頭最大 7,800 文字です。生成用セッションではツール・拡張・セッション保存を無効にしています。差分がない場合や生成に失敗した場合は通常の手入力に戻ります。差分がないリポジトリでは、手入力できても通常の空コミットはできません（意図して空コミットする場合は Git の `--allow-empty` を使用）。

生成文は既存の画面で選択・編集できます。内容を確認し、**Yes** を選んだ場合だけコミットします。AI 自体はコミットしません。`ai` を付けなければ通常の対話フローです。詳しくは [AI の使い方](docs/cli/ai.md) を参照してください。

## 出典とライセンス

このリポジトリには Qiubin Zheng 氏と貢献者による cz-git のソースと文書が含まれています。著作権・許諾表示は [MIT ライセンス](LICENSE) と各パッケージの `LICENSE` に維持しています。この派生版の変更も MIT で配布します。上流作者による承認・後援を示すものではありません。

`docs/` 内の一部は上流由来の既存文書です。旧 OpenAI 設定の記述は、この派生版の `czg ai` には適用されません。
