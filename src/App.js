import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

  // Generate a List of Random words <--

  let randomWords = require('random-words');
  const [nextWordsArray, setNextWordsArray]= useState([])

  const [Words, setWords] = useState([])
  const [Writing, setWriting] = useState("")
  const [score, setScore] = useState(0)
  const [lose, setLose] = useState(0)
  let rerender = Words.length % 2 === 0;

  //Word generate divs
  useEffect(() => {

    const interval = setInterval(() => {
      let word = randomWords();        
      setWords(prevWords => [...prevWords, word])
    }, (Math.floor(Math.random() * 2) + 1) * 1000)
    return () => clearInterval(interval)
  }, [rerender])

  useEffect(()=>{
    const nextWordsArray = Words.map((word)=>{
      return (<div className='word' key={word} style={{ position: 'absolute', left: Math.floor(Math.random() * (window.innerWidth - 500)) + 150  + "px" }}>
          {word}
        </div>)
    })
    setNextWordsArray(nextWordsArray)
    console.log(Words)

  },[Words])

  //disappear word when stuck bot
  useEffect(() => {
    const intervalDelete = setInterval(() => {
      const divs = [...document.getElementsByClassName('word')]
      divs.forEach(word => {
        const rect = word.getBoundingClientRect();
        if (rect.bottom >= window.innerHeight - 100) {
          word.parentNode.removeChild(word)
          setLose(l => l + 1)
        }
      });
    }, 1000)
    return () => clearInterval(intervalDelete)
  }, [])

  //track writing
  useEffect(() => {

    const handleKeyDown = (event) => {

      //writing
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        setWriting(prevWriting => prevWriting + event.key);
      }

      //enter key
      if (event.keyCode === 13) {
        const divs = document.getElementsByClassName('word')
        for (let i = 0; i < divs.length; i++) {
          const value = divs[i].textContent
          if (value === Writing) {
            if (value.length >= 7) {
              divs[i].parentNode.removeChild(divs[i]);
              setScore(s => s + 2)
            } else {
              divs[i].parentNode.removeChild(divs[i]);
              setScore(s => s + 1)
            }
            setWriting(() => "")
            return
          }
        }
        if (Writing !== "") {
          setLose(l => l + 1)
        }
        setWriting(() => "")
      }

      //back using backspace
      if (event.keyCode === 8) {
        setWriting(Writing.slice(0, -1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [Writing])

  console.log(Writing)

  return (

    <div className="container">
      <div className='scoreBoard'>
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
      {nextWordsArray}
    </div>
  );
}

export default App;
