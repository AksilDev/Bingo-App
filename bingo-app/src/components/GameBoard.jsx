import { useState } from 'react';
import BingoCard from './BingoCard';
import { bingoApi } from '../services/bingoApi';
import './GameBoard.css';

const GameBoard = ({ gameCode, cards, onAddCard, onLeaveGame }) => {
  const [winners, setWinners] = useState(new Set());
  const [checking, setChecking] = useState(null);

  const handleCheckWin = async (cardIndex, playcard_token) => {
    setChecking(cardIndex);

    try {
      const isWinner = await bingoApi.checkWin(playcard_token);

      if (isWinner) {
        setWinners(new Set([...winners, cardIndex]));
        alert(`Card #${cardIndex + 1} is a WINNER!`);
      } else {
        alert(`Card #${cardIndex + 1} is not a winner yet. Keep playing!`);
      }
    } catch (error) {
      alert('Error checking win status. Please try again.');
    } finally {
      setChecking(null);
    }
  };

  const handleAddCard = async () => {
    try {
      const newCard = await bingoApi.getCard(gameCode);
      onAddCard(newCard);
    } catch (error) {
      alert('Failed to add new card. Please try again.');
    }
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="game-info">
          <h1>BINGO Game</h1>
          <p className="game-code-display">Game Code: <span>{gameCode}</span></p>
        </div>
        <div className="game-actions">
          <button className="add-card-button" onClick={handleAddCard}>
            + Add Card
          </button>
          <button className="leave-button" onClick={onLeaveGame}>
            Leave Game
          </button>
        </div>
      </div>

      <div className="cards-container">
        {cards.length === 0 ? (
          <div className="no-cards">
            <p>No cards yet. Click "Add Card" to get started!</p>
          </div>
        ) : (
          cards.map((card, index) => (
            <BingoCard
              key={`${card.playcard_token}-${index}`}
              card={card.card}
              cardNumber={index + 1}
              onCheckWin={() => handleCheckWin(index, card.playcard_token)}
              isWinner={winners.has(index)}
            />
          ))
        )}
      </div>

      {checking !== null && (
        <div className="checking-overlay">
          <div className="spinner"></div>
          <p>Checking Card #{checking + 1}...</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
