import { useState } from 'react';
import GameCodeEntry from './components/GameCodeEntry';
import GameBoard from './components/GameBoard';
import { bingoApi } from './services/bingoApi';
import './App.css';

function App() {
  const [gameCode, setGameCode] = useState(null);
  const [cards, setCards] = useState([]);

  const handleJoinGame = async (code) => {
    const firstCard = await bingoApi.getCard(code);
    setGameCode(code);
    setCards([firstCard]);
  };

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleLeaveGame = () => {
    setGameCode(null);
    setCards([]);
  };

  return (
    <div className="app">
      {!gameCode ? (
        <GameCodeEntry onJoinGame={handleJoinGame} />
      ) : (
        <GameBoard
          gameCode={gameCode}
          cards={cards}
          onAddCard={handleAddCard}
          onLeaveGame={handleLeaveGame}
        />
      )}
    </div>
  );
}

export default App;
