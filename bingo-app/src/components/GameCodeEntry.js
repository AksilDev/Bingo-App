import React, { useState } from 'react';

function GameCodeEntry({ onStartGame }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a game code');
      return;
    }
    setError('');
    onStartGame(code.trim());
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-5xl font-bold text-center mb-2 text-honey-yellow">
          BINGO
        </h1>
        <p className="text-lime-green text-center mb-8 text-lg">
          Enter Game Code to Start
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter Game Code"
              className="w-full px-4 py-3 text-center text-2xl font-bold bg-white border-4 border-honey-yellow rounded-lg focus:outline-none focus:border-lime-green transition-colors uppercase"
              maxLength={20}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-lime-green hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Join Game
          </button>
        </form>

        <div className="mt-8 text-center text-honey-yellow text-sm">
          <p>Example: HEelhJos</p>
        </div>
      </div>
    </div>
  );
}

export default GameCodeEntry;
