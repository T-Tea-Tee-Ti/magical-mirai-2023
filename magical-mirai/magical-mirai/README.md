## 概要

自分だけの写真たてを作ることができるリリックアプリです。<br>
音楽に合わせて海の仲間たちも出てきてくれます。

## 操作方法

1. 再生・一時停止・停止<br>
   アプリ左上の「再生」ボタンを押すと再生が開始され、「一時停止」ボタンに切り替わります。<br>
   「一時停止」ボタンを押すと一時停止します。再度再生する場合は「再生」ボタンを押すと曲が再開します。<br>
   「停止」ボタンを押すと曲が停止・最初から再生されます。
   ![IMG1](/readme-images/screenshot-1.png)

2. 写真たての飾り付け<br>
   写真たての素材を選択し、「追加する」ボタンを押すと素材が追加されます。<br>
   素材はドラッグ＆ドロップで好きな位置に貼り付けることができます。<br>
   「1 つ戻る」ボタンを押すと 1 番最近貼り付けた素材を削除することができます。間違えて貼り付けてしまった場合に使用できます。<br>
   「閉じる」ボタンを押すと素材選択欄を非表示にすることができます。<br>
   ![IMG1](/readme-images/screenshot-2.png)

3. 作品例
   ![IMG1](/readme-images/screenshot-3.png)

## 使用方法

1. github から本作品を clone する。

```
$ git clone https://github.com/Motohiro-Otsuka/magical_mirai2022.git
```

2. 以下のコマンドを実行する。

```
$ npm i もしくは npm install
$ npm run build ※npm run devでも確認は可能
$ node .output/server/index.mjs
```

## 環境

- 稼働保証環境

  - 画面サイズ：横 1024px 以上、縦 840px 以上の端末。（基本的には PC のみに対応しております。）
  - ブラウザ：edge, chrome

## 対応楽曲

- ネオンライトの海を往く / Ponchi♪ feat. 初音ミク

## 作品への思いなど

今回初めて本コンテストに参加します。<br>
昨年度初めてマジカルミライに参加しましたが、会場の熱や初音ミクたちの迫力に圧倒され、「来年も参加したい」と思うようになりました。<br>
また、最近プログラミングで自身の思うように表現ができるようになってきたため、今回のコンテストに応募しました。<br>
今回のテーマは「写真たて」です。<br>
マジカルミライの開催は大阪が 8 月、東京が 9 月と夏に開催されます。<br>
そのため、まずは夏っぽい雰囲気にしようと考えました。<br>
ただ作成したアプリを見ていただくだけでなく、ユーザが自由に操作しながら楽しんでもらいたい。<br>
その結果、「ユーザオリジナルの写真たてを作って夏を・マジカルミライをより楽しんでいただこう」と考えました。<br>
本アプリを使って、少しでも楽しんでいただけますと幸いです。

## 開発担当

T（てぃ）

## 使用画像素材等

- 初音ミク：T（自作）
- 海の仲間たち：海の仲間たち（https://uminonakamatachi.com/）
- 写真たての素材：illustAC ソラノ様（https://www.ac-illust.com/main/profile.php?id=23311279&area=1）

## TextAlive App API

![TextAlive](https://i.gyazo.com/thumb/1000/5301e6f642d255c5cfff98e049b6d1f3-png.png)

TextAlive App API は、音楽に合わせてタイミングよく歌詞が動く Web アプリケーション（リリックアプリ）を開発できる JavaScript 用のライブラリです。

TextAlive App API について詳しくは Web サイト [TextAlive for Developers](https://developer.textalive.jp/) をご覧ください。

---

https://github.com/TextAliveJp/textalive-app-basic
