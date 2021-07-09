import axios from "axios";

export const getShiritori = () =>
  axios
    .get("https://shiritori-api.glitch.me/shiritori")
    .then<{ word: string; user: string; words: string[] }>((result) => result.data);

export const judgeShiritori = (answer: { word: string; user: string }) =>
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
    .then<{ result: boolean; text: string; word: string }>((result) => result.data);
