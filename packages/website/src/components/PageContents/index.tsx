import axios from "axios";
import React, { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { v4 as uuid } from "uuid";
import { Loader } from "../Loader";

export type Shiritori = { word: string; user: string; words: string[] };
type JudgeResult = { result: boolean; text: string; word: string };

const API_URL = "https://shiritori-api.glitch.me/shiritori";

const judgeShiritori = (answer: { word: string; user: string }) =>
  axios
    .post(
      API_URL,
      { shiritori: JSON.stringify(answer) },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then<JudgeResult>((result) => result.data);

const getShititori = (url: string) => {
  return axios.get(url).then<Shiritori>((result) => result.data);
};

const Loading = React.memo(() => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader />
    </div>
  );
});

const Words: React.VFC<{ words: string[] }> = React.memo(({ words }) => {
  return (
    <div>
      <textarea
        value={words.join("→")}
        readOnly
        rows={10}
        className="w-full p-2 resize-y cursor-default"
      ></textarea>
    </div>
  );
});

const Word: React.VFC<{ word: string }> = React.memo(({ word }) => {
  return (
    <div>
      <p>{word}</p>
    </div>
  );
});

const Form: React.VFC<{ isFlag: React.Dispatch<React.SetStateAction<boolean>> }> = React.memo(
  ({ isFlag }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const input = inputRef.current;
            if (!input?.value) return alert("入力してね");
            isFlag(true);

            const answer = {
              word: input.value,
              user: uuid(),
            };
            const judge = judgeShiritori(answer).then((judge) => {
              console.log(judge);
              if (judge.result) {
                alert(`正解: '${judge.word}'を回答しました！`);
              } else {
                alert(`${"(´- ₃ -`) ﾌﾞﾌﾞｰ"} '${judge.word}'は間違いです、${judge.text}`);
              }
              input.value = "";
              isFlag(false);
            });
            mutate(API_URL, judge);
          }}
        >
          <div className="w-full flex gap-2">
            <input
              ref={inputRef}
              placeholder={"入力してね"}
              type="text"
              className="w-full p-2 box-border border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
            />
            <button className="p-2 border border-gray-500 shadow-sm hover:border-indigo-300 hover:ring hover:ring-indigo-200 hover:ring-opacity-50 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md whitespace-nowrap">
              <span className="inline-block text-gray-500 text-base h-4 leading-4 align-middle hover:text-indigo-300">
                答える
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export const PageContents: React.VFC = () => {
  const [state, setState] = useState<boolean>(false);
  const { data, error } = useSWR(API_URL, getShititori);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  return (
    <main>
      <section className="max-w-lg mx-auto mt-4">
        <h3>既に出た単語</h3>
        <Words words={data.words} />
      </section>
      <section className="max-w-lg mx-auto mt-4">
        <h3>現在の単語</h3>
        <Word word={data.word} />
      </section>
      <section className="max-w-lg mx-auto mt-4">
        <h3>入力</h3>
        <Form isFlag={setState} />
      </section>
      {state && (
        <div className="fixed top-0 left-0 bg-gray-500 bg-opacity-50 h-full w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </main>
  );
};
