import React, { useState } from 'react';
import GameCodeEntry from './components/GameCodeEntry';
import BingoGame from './components/BingoGame';

function App() {
  const [gameCode, setGameCode] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = (code) => {
    setGameCode(code);
    setIsGameStarted(true);
  };

  const handleExitGame = () => {
    setIsGameStarted(false);
    setGameCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-yellow via-lime-green to-honey-yellow">
      {!isGameStarted ? (
        <GameCodeEntry onStartGame={handleStartGame} />
      ) : (
        <BingoGame gameCode={gameCode} onExit={handleExitGame} />
      )}
    </div>
  );
}

export default App;
