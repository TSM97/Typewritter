import "./App.css";
import { getRandomMedianCloseTo2000 } from "./utils";
import { Clock } from "./Components/Clock/Clock";
import { Keyboard } from "./Components/Keyboard/Keyboard";
import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

function App() {
  // Generate a List of Random words <--

  let randomWords = require("random-words");
  const [Words, setWords] = useState([]);
  const [Writing, setWriting] = useState("");
  const [point, setPoints] = useState(0);
  const [time, setTime] = useState(2);
  const [clock, setClock] = useState(12.00)
  const [stop, setStop] = useState(false)
  const [start, setStart] = useState(false)
  const [lvl, setlvl] = useState(0)
  const [key, setKey] = useState('')


  const mounted = useRef(false);

  //lvls and losing
  useEffect(() => {
    if (clock <= 0) {
      setStop(true)
    }
    if (point >= 30) {
      setlvl(1)
    }
    else if (point >= 70) {
      setlvl(2)
    }
    else if (point >= 150) {
      setlvl(3)
    }
    else if (point >= 230) {
      setlvl(4)
    }
  }, [clock, point, lvl])

  //Word generate divs
  useEffect(() => {
    if (!stop) {
      if (start) {
        if (mounted.current) {
          setTimeout(() => {
            const word = randomWords().toString();
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
            if (lvl === 0) setTime(getRandomMedianCloseTo2000());
            if (lvl === 1) setTime(getRandomMedianCloseTo2000(1))
          }, time);
        }
      }
    }

    mounted.current = true;
  }, [time, randomWords, stop, start, lvl]);

  //track writing
  useEffect(() => {
    if (!stop) {
      const handleKeyDown = (event) => {
        //writing
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          setWriting((prevWriting) => prevWriting + event.key);
          setKey(() => event.key)
        }
        if (event.keyCode === 13) {
          setWords((prevWords) =>
            prevWords.map((word) => {
              return (word.text === Writing ? { ...word, className: `${word.className} found` } : word)
            })
          );
          const matchedWord = Words.find((word) => word.text === Writing)
          if (matchedWord) {
            setPoints((prevPoints) => prevPoints + 1)
            clockWin()
            setTimeout(() => {
              setWords((prevWords) =>
                prevWords.filter((word) => {
                  return word.text !== matchedWord.text;
                })
              )
            }, 500)
          } else {
            setClock((prevClock) => prevClock - 1)
          }
          if (Writing === "start") setStart(true)
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
    }
  }, [Writing, setWriting, Words, stop]);

  function clockWin() {
    setClock((prevClock) => prevClock + 1.5)
  }
  function clockLose() {
    setClock((prevClock) => prevClock - 1)
  }

  function removeWord(word) {
    setWords((prevWords) => prevWords.filter((_word) => _word !== word));
    clockLose()
  }

  return (
    <>
      <div className="container">
        <div className="scoreBoard">
          <div>
            {start ? <Clock clock={clock} setClock={setClock} stop={stop} start={start} /> : ""}
          </div>
          <div>
            <h3>Points</h3>
            <h2>{point}</h2>
          </div>
          <div className="writting">{Writing}</div>
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
            // { word.div ? <div style={{ position: word.style.position, left: word.style.left }} className="plus">+2</div> : null }
          );
        })}
        <div className="begin">{!start ? "Type <start>" : ""}</div>
      </div>
      <Keyboard theKey={key} setTheKey={setKey} />
    </>


  );
}

export default App;

