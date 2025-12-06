import React, { useState } from 'react';

function BingoCard({ cardData, cardToken, onCheckWin, cardNumber }) {
  const [markedNumbers, setMarkedNumbers] = useState(new Set());
  const [isWinner, setIsWinner] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const toggleNumber = (column, index) => {
    const key = `${column}-${index}`;
    const newMarked = new Set(markedNumbers);
    
    if (newMarked.has(key)) {
      newMarked.delete(key);
    } else {
      newMarked.add(key);
    }
    
    setMarkedNumbers(newMarked);
  };

  const handleCheckWin = async () => {
    setIsChecking(true);
    try {
      const response = await fetch(
        `http://www.hyeumine.com/checkwin.php?playcard_token=${cardToken}`
      );
      const result = await response.text();
      
      if (result === '1') {
        setIsWinner(true);
        onCheckWin && onCheckWin(cardNumber, true);
      } else {
        alert('Not a winning card yet. Keep playing!');
      }
    } catch (error) {
      console.error('Error checking win:', error);
      alert('Error checking win status. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const columns = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className={`bg-black bg-opacity-90 p-6 rounded-xl shadow-2xl ${isWinner ? 'ring-4 ring-lime-green animate-pulse' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-honey-yellow font-bold text-lg">
          Card #{cardNumber}
        </h3>
        {isWinner && (
          <span className="bg-lime-green text-black px-3 py-1 rounded-full font-bold text-sm">
            WINNER! 🎉
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 gap-1 mb-4">
        {columns.map((letter) => (
          <div
            key={letter}
            className="bg-honey-yellow text-black font-bold text-2xl py-3 text-center rounded-t-lg"
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {columns.map((column) =>
          cardData[column].map((number, index) => {
            const key = `${column}-${index}`;
            const isMarked = markedNumbers.has(key);
            const isFreeSpace = column === 'N' && index === 2;

            return (
              <button
                key={key}
                onClick={() => !isFreeSpace && toggleNumber(column, index)}
                className={`
                  aspect-square flex items-center justify-center text-xl font-bold rounded-lg
                  transition-all transform hover:scale-105
                  ${isFreeSpace 
                    ? 'bg-lime-green text-black cursor-default' 
                    : isMarked
                    ? 'bg-lime-green text-black shadow-lg'
                    : 'bg-white text-black hover:bg-honey-yellow'
                  }
                `}
                disabled={isFreeSpace}
              >
                {isFreeSpace ? 'FREE' : number}
              </button>
            );
          })
        )}
      </div>

      <button
        onClick={handleCheckWin}
        disabled={isChecking || isWinner}
        className={`
          w-full mt-4 py-3 px-6 rounded-lg font-bold text-lg transition-all
          ${isWinner
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-honey-yellow hover:bg-yellow-500 text-black transform hover:scale-105'
          }
        `}
      >
        {isChecking ? 'Checking...' : isWinner ? 'Winner!' : 'Check Win'}
      </button>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Token: {cardToken}
      </p>
    </div>
  );
}

export default BingoCard;
