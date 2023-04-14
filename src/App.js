import "./App.css";
import { getRandomMedianCloseTo2000 } from "./utils";
import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

function App() {
  // Generate a List of Random words <--

  let randomWords = require("random-words");
  const [Words, setWords] = useState([]);
  const [Writing, setWriting] = useState("");
  const [score, setScore] = useState(0);
  const [lose, setLose] = useState(0);
  const [time, setTime] = useState(2);

  const mounted = useRef(false);

  //Word generate divs
  useEffect(() => {
    if (mounted.current) {
      setTimeout(() => {
        const word = randomWords();
        const key = v4();
        console.log(word)
        setWords((prevWords) => [
          ...prevWords,
          {
            text: word,
            style: {
              position: "absolute",
              left: `${Math.floor(
                Math.random() * (window.innerWidth - 350) + 150
              )}px`,
            },
            className: 'word',
            key,
          },
        ]);
        setTime(getRandomMedianCloseTo2000());
      }, time);
    }

    mounted.current = true;
  }, [time, randomWords]);

  //track writing
  useEffect(() => {
    const handleKeyDown = (event) => {
      //writing
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        setWriting((prevWriting) => prevWriting + event.key);
      }

      //enter key
      if (event.keyCode === 13) {
        setWords((prevWords) =>
          prevWords.map((word) => word.text === Writing ? { ...word, className: `${word.className} found` } : word)
        );
        const matchedWord = Words.find((word) => word.text === Writing)
        if (matchedWord) {
          setTimeout(() => {
            setWords((prevWords) =>
              prevWords.filter((word) => {
                console.log(word.text, "---", matchedWord.text)
                return word.text !== matchedWord.text;
              })
            )
          }, 500)
        }
        setWriting(() => "");
      }

      //back using backspace
      if (event.keyCode === 8) {
        setWriting((prevWriting) => prevWriting.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [Writing, setWriting, Words]);

  function removeWord(word) {
    setWords((prevWords) => prevWords.filter((_word) => _word !== word));
    setLose((prevLose) => prevLose + 1)
  }

  return (
    <div className="container">
      <div className="scoreBoard">
        <div>
          <h3> Victory Points</h3>
          <h2>{score}</h2>
        </div>
        <div>
          <h3> Lose Points</h3>
          <h2>{lose}</h2>
        </div>
        <h1>{Writing}</h1>
      </div>
      {Words.map((word) => {
        return (
          <div
            className={word.className}
            onAnimationEnd={() => removeWord(word)}
            key={word.key}
            style={{ position: word.style.position, left: word.style.left }}
          >
            {word.text}
          </div>
        );
      })}
    </div>
  );
}

export default App;

