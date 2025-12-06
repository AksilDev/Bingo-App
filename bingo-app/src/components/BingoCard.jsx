import { useState } from 'react';
import './BingoCard.css';


const BingoCard = ({ card: cardNumbers, token, cardNumber, onCheckWin, isWinner }) => {
  const [markedCells, setMarkedCells] = useState(new Set());

  const toggleCell = (column, value) => {
    // ... (rest of the toggleCell function)
    const cellKey = `${column}-${value}`;
    const newMarked = new Set(markedCells);

    if (newMarked.has(cellKey)) {
      newMarked.delete(cellKey);
    } else {
      newMarked.add(cellKey);
    }

    setMarkedCells(newMarked);
  };

  const isCellMarked = (column, value) => {
    return markedCells.has(`${column}-${value}`);
  };

  const renderColumn = (columnName, numbers) => {
    return (
      <div className="bingo-column" key={columnName}>
        <div className="column-header">{columnName}</div>
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`bingo-cell ${isCellMarked(columnName, num) ? 'marked' : ''}`}
            onClick={() => toggleCell(columnName, num)}
          >
            {num}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`bingo-card ${isWinner ? 'winner' : ''}`}>
      <div className="card-header">
        <h3>Card #{cardNumber}</h3>
        {isWinner && <span className="winner-badge">WINNER!</span>}
      </div>

      <div className="bingo-grid">
        {/* FIX 1: Use 'cardNumbers' instead of 'numbers' */}
        {renderColumn('B', cardNumbers.B)}
        {renderColumn('I', cardNumbers.I)}
        {renderColumn('N', cardNumbers.N)}
        {renderColumn('G', cardNumbers.G)}
        {renderColumn('O', cardNumbers.O)}
      </div>

      <button
        className="check-win-button"
        onClick={onCheckWin}
        disabled={isWinner}
      >
        {isWinner ? 'Winner!' : 'Check Win'}
      </button>

      <div className="card-token">
        {/* FIX 2: Use 'token' instead of 'playcard_token' */}
        Token: {token}
      </div>
    </div>
  );
};

export default BingoCard;