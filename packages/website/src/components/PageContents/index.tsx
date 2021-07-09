import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

type Shiritori = { word: string; user: string; words: string[] };

const judgeShiritori = (answer: { word: string; user: string }) =>
  axios
    .post(
      "https://shiritori-api.glitch.me/shiritori",
      { shiritori: JSON.stringify(answer) },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then<{ result: boolean; text: string }>((result) => result.data);

export const PageContents = () => {
  const [shiritori, setShiritori] = useState<Shiritori>({ word: "", user: "", words: [] });
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    (async () => {
      const data = await axios
        .get("https://shiritori-api.glitch.me/shiritori")
        .then<Shiritori>((result) => result.data);

      setShiritori(data);
    })();
  }, []);

  return (
    <main>
      {shiritori.word && (
        <>
          <section className="max-w-lg mx-auto mt-4">
            <h3>既に出た単語</h3>
            <div>
              <textarea
                defaultValue={shiritori.words}
                readOnly
                rows={10}
                className="w-full p-2 resize-y cursor-default"
              ></textarea>
            </div>
          </section>
          <section className="max-w-lg mx-auto mt-4">
            <h3>現在の単語</h3>
            <div>
              <p>{shiritori.word}</p>
            </div>
          </section>
          <section className="max-w-lg mx-auto mt-4">
            <h3>入力</h3>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const input = inputRef.current;
                  if (!input?.value) return;
                  const answer = {
                    word: input.value,
                    user: uuid(),
                  };
                  judgeShiritori(answer).then((judge) => {
                    if (judge.result) {
                      alert(`正解: '${input.value}'を回答しました！`);
                    } else {
                      alert(`${"(´- ₃ -`) ﾌﾞﾌﾞｰ"} '${input.value}'は間違いです、${judge.text}`);
                    }
                  });
                }}
              >
                <div className="w-full flex gap-2">
                  <input
                    ref={inputRef}
                    placeholder={"入力してね"}
                    defaultValue={shiritori.word.slice(-1)}
                    type="text"
                    className="w-full p-2 box-border border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                  />
                  <button className="p-2 border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md whitespace-nowrap">
                    <span className="inline-block text-gray-500 text-base h-4 leading-4 align-middle">
                      答える
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </main>
  );
};
