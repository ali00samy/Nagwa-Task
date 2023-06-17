const express = require('express');
const app = express();
const testData = require('./TestData.json');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// words endpoint
app.get('/words', (req, res) => {
    const words = testData.wordList
    const getRandomWord = (pos) => {
      const matchingWords = words.filter(
        (wordObj) => wordObj.pos === pos
      );
      return matchingWords[Math.floor(Math.random() * matchingWords.length)];
    };

    const getRandom = () => {
      const matchingWords = words.filter(
        (wordObj) => wordObj
      );
      return matchingWords[Math.floor(Math.random() * matchingWords.length)];
    };
  
    // get 4 word (adj , adv , noun , verb)
    const selectedWords = [];
    selectedWords.push(getRandomWord('adjective'));
    selectedWords.push(getRandomWord('adverb'));
    selectedWords.push(getRandomWord('noun'));
    selectedWords.push(getRandomWord('verb'));
  
    // get the rest of 10 words
    while (selectedWords.length < 10) {
      const randomWord = getRandom();
      if (!selectedWords.includes(randomWord)) {
        selectedWords.push(randomWord);
      }
    }
  
    res.json(selectedWords);
});

// rank endpoint
app.post('/rank', (req, res) => {
  const { finalScore } = req.body;
  const scoresList = testData.scoresList;
  const belowScores = scoresList.filter((score) => score < finalScore);
  const rankPercentage = (belowScores.length / scoresList.length) * 100;

  res.json({ rank: Math.round(rankPercentage * 100) / 100 });
});



// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
