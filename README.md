# しりとりオンライン

しりとりしよっか

[![Deploy to gh-pages](https://github.com/ivgtr/shiritori-online/actions/workflows/deploy.yml/badge.svg)](https://github.com/ivgtr/shiritori-online/actions/workflows/deploy.yml) [![Publish to npm](https://github.com/ivgtr/shiritori-online/actions/workflows/publish.yml/badge.svg)](https://github.com/ivgtr/shiritori-online/actions/workflows/publish.yml)

_※ only japanese_

## ルール
1. 英数字空白禁止！
1. 問題の最後の文字から始まる単語を言ってね
1. 名詞以外禁止！
1. 固有名詞は禁止！
1. 最後に'ん'が付いたら負けだよ
1. 同じ単語は使用不可だよ

## 遊び方
#### ウェブサイトから
[shiritori online](https://ivgtr.github.io/shiritori-online/)

#### cliから
```shell
$ npm install --global shiritori-cli
```

```shell
$ shiritori --help
    Usage
      $ shiritori
    Examples
      $ shiritori
        問題を取得するのでひらがな答えてください

      $ shiritori -w
        既に出てる単語のリストを確認できます
```

## License

MIT ©[ivgtr](https://github.com/ivgtr)

[![Twitter Follow](https://img.shields.io/twitter/follow/ivgtr?style=social)](https://twitter.com/ivgtr) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)