import { useState } from 'react';
import './GameCodeEntry.css';

const GameCodeEntry = ({ onJoinGame }) => {
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onJoinGame(gameCode.trim());
    } catch (err) {
      setError(err.message || 'Failed to join game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-code-entry">
      <div className="entry-container">
        <h1>BINGO</h1>
        <p className="subtitle">Enter game code to join</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            placeholder="Enter game code"
            className="game-code-input"
            disabled={loading}
          />

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="join-button"
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameCodeEntry;
