import chalk from "chalk";
import ora from "ora";
import * as readline from "readline";
import { v4 as uuid } from "uuid";
import { getShiritori, judgeShiritori } from "./utils/requestShiritori.js";

const readUserInput = async (question: string): Promise<string> => {
  const prompts = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    prompts.question(question, (answer) => {
      if (!answer) reject(new Error("回答がないよ"));
      resolve(answer);
      prompts.close();
    });
  });
};

export const shiritori = async (word: string) => {
  const spinner1 = ora(`${chalk.bgYellow.black("WAITING")} 通信中...`).start();
  const questions = await getShiritori();
  spinner1.succeed(`${chalk.bgGreen("FINISH!")} 現在の回答:${questions.word}`);

  let answer: string;
  if (!word) {
    answer = await readUserInput(`${chalk.bgBlue("Input")} 回答を入力してね:`).catch((e) => {
      throw new Error(e.message);
    });
  } else answer = word;

  const spinner2 = ora(`${chalk.bgYellow.black("WAITING")} 判定中...`).start();
  const judge = await judgeShiritori({ word: answer, user: uuid() });
  spinner2.stop();

  return { result: judge.result, text: judge.text, word: judge.word };
};

export const shiritoriList = async () => {
  const spinner = ora(`${chalk.bgYellow.black("WAITING")} 通信中...`).start();
  const { words } = await getShiritori();
  spinner.succeed(`${chalk.bgGreen("FINISH!")} ${words.length}件のデータを取得`);
  words[words.length - 1] = chalk.black.bgYellow(words[words.length - 1]);
  console.log(words.join(chalk.yellow("→")));
};
