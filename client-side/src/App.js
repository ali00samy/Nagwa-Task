import React, { useState } from 'react';
import WordsGame  from "./pages/components/wordsgame";

function App() {
  const [scorePercentage, setScorePercentage] = useState(null);

  return (
    <div className="App">
        <WordsGame onScoreChange={setScorePercentage} />
    </div>
  );
}

export default App;
