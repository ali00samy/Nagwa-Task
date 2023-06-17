import { useEffect, useState } from "react";


function WordsGame ({onScoreChange}) {
  const [words, setWords] = useState([]);
  const [arrIndex, setArrIndex] = useState(0);
  const options = ["adjective", "adverb", "noun", "verb"];
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [scorePercentage, setScorePercentage] = useState(null);
  const [rank, setRank] = useState(null);
  const [score, setScore] = useState(0);

  const fetchWords = () => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    if (scorePercentage === 100) {
      getRank();
    }
  }, [scorePercentage]);

  const getRank = () => {
    fetch("http://localhost:3000/rank", { finalScore: scorePercentage })
      .then((res) => res.json())
      .then((data) => setRank(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const handleOptionsOnClick = (e) => {
    if (e === words.slice(arrIndex, arrIndex + 1)[0].pos) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }

    // Calculate and update the score
    let newScore;

    newScore = (isCorrectAnswer === true) ? score + 10 : score;
    
    setScore(newScore);

    console.log(newScore);

    const scorePercentage = (newScore / words.length) * 100;

    onScoreChange(scorePercentage);
  };


  const handleNextOnClick = () => {
    // move to next word
    if (arrIndex <= words.length - 1) {
      setArrIndex(arrIndex + 1);
      setIsCorrectAnswer(null);
    }
  };

  function TryAgainHandler(){
    window.location.reload();
} 

  const word = words.slice(arrIndex, arrIndex + 1).map((w) => (
    <h3 key={w.id}>
      {arrIndex + 1}. {w.word}
    </h3>
  ));

  return (
    <div className="App">
      {arrIndex <= words.length - 1 ? (
        <>
          <div className="header">
            {word}
            <button
              disabled={isCorrectAnswer === null ? true : false}
              onClick={handleNextOnClick}
            >
              Next Word
            </button>
          </div>

          {options.map((option, index) => (
            <button
              value={option}
              key={index}
              onClick={(e) => handleOptionsOnClick(e.target.value)}
            >
              {option}
            </button>
          ))}
          {isCorrectAnswer !== null && (
            <>{isCorrectAnswer ? <h3>Correct</h3> : <h3>Wrong</h3>}</>
          )}
        </>
      ) : (
        <>
           <h1>Rank Screen</h1>
            {rank !== null ? (
        <div>
          <p>Your rank among peers: {rank}%</p>
        </div>
      ) : (
        <p>Calculating your rank...</p>
      )}
      <button onClick={TryAgainHandler}>Try Again</button>
        </>
      )}
    </div>
  );
}

export default WordsGame;