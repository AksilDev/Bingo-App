import React, { useState } from 'react';
import BingoCard from './BingoCard';

function BingoGame({ gameCode, onExit }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNewCard = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `http://www.hyeumine.com/getcard.php?bcode=${gameCode}`
      );
      const data = await response.json();
      
      if (data === 0 || !data.playcard_token) {
        setError('Invalid game code or unable to fetch card');
        return;
      }

      setCards([...cards, {
        token: data.playcard_token,
        data: data.card,
        id: Date.now()
      }]);
    } catch (err) {
      console.error('Error fetching card:', err);
      setError('Failed to fetch card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleCardWin = (cardNumber, isWinner) => {
    if (isWinner) {
      console.log(`Card #${cardNumber} is a winner!`);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-black bg-opacity-80 p-6 rounded-xl shadow-2xl mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-honey-yellow mb-2">
                BINGO GAME
              </h1>
              <p className="text-lime-green text-lg">
                Game Code: <span className="font-bold">{gameCode}</span>
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={fetchNewCard}
                disabled={isLoading}
                className="bg-lime-green hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : '+ Add Card'}
              </button>
              
              <button
                onClick={onExit}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Exit Game
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-500 text-white p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Cards Display */}
        {cards.length === 0 ? (
          <div className="bg-black bg-opacity-80 p-12 rounded-xl text-center">
            <p className="text-honey-yellow text-2xl mb-4">
              No cards yet!
            </p>
            <p className="text-lime-green text-lg mb-6">
              Click "Add Card" to get your first bingo card
            </p>
            <button
              onClick={fetchNewCard}
              disabled={isLoading}
              className="bg-lime-green hover:bg-green-500 text-black font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Get Your First Card
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={card.id} className="relative">
                <button
                  onClick={() => removeCard(card.id)}
                  className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg"
                  title="Remove card"
                >
                  ×
                </button>
                <BingoCard
                  cardData={card.data}
                  cardToken={card.token}
                  cardNumber={index + 1}
                  onCheckWin={handleCardWin}
                />
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {cards.length > 0 && (
          <div className="mt-6 bg-black bg-opacity-80 p-6 rounded-xl">
            <h3 className="text-honey-yellow font-bold text-xl mb-3">
              How to Play:
            </h3>
            <ul className="text-lime-green space-y-2">
              <li>• Click on numbers to mark them as called</li>
              <li>• The center space (FREE) is automatically marked</li>
              <li>• Click "Check Win" to verify if your card is a winner</li>
              <li>• You can play multiple cards simultaneously</li>
              <li>• Remove cards using the × button in the top-right corner</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BingoGame;
