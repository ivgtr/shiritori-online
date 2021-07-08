#!/usr/bin/env node

import chalk from "chalk";
import meow from "meow";
import type { Package } from "update-notifier";
import updateNotifier from "update-notifier";
import { shiritori, shiritoriList } from "./index.js";

const cli = async () => {
  const cli = meow(
    `
Usage
  $ shiritori
Examples
  $ shiritori
  問題を取得するのでひらがな答えてください
  $ shiritori -w
  既に出てる単語のリストを確認できます
`,
    {
      importMeta: import.meta,
      flags: {
        watch: {
          type: "boolean",
          alias: "w",
          default: false,
        },
      },
    }
  );

  updateNotifier({ pkg: cli.pkg as Package }).notify();

  const { input, flags } = cli;
  if (flags?.v) {
    cli.showVersion();
    return;
  }
  if (flags?.h) {
    cli.showHelp(0);
    return;
  }
  if (flags.watch) {
    shiritoriList();
    return;
  }

  shiritori(input[0])
    .then(({ result, answer, text }) => {
      if (result) return console.log(`${chalk.bgGreen("SUCCESS!")} '${answer}'を回答しました！`);
      console.log(`${chalk.bgRed("(´- ₃ -`) ﾌﾞﾌﾞｰ")} '${answer}'は間違いです、${text}`);
    })
    .catch((err) => {
      console.error(`${chalk.bgRed("ERROR!")} ${err.message}`);
    });
};

cli();
