import React, { useState, useCallback } from "react";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  cursor: "pointer",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinner = (squares) => {
  for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
    const [sq1, sq2, sq3] = WINNING_CONDITIONS[i];

    if (
      squares[sq1] &&
      squares[sq1] === squares[sq2] &&
      squares[sq1] === squares[sq3]
    ) {
      return squares[sq1];
    }
  }

  return null;
};

function Square({ value, click }) {
  return (
    <div className="square" style={squareStyle} onClick={click}>
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const handleClick = (index) => {
    if (getWinner(squares) || squares[index]) {
      return;
    }
    console.log(isX);
    squares[index] = isX ? "X" : "O";
    setIsX(!isX);
  };

  const handleReset = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
  };

  const renderSquare = (index) => (
    <Square value={squares[index]} click={() => handleClick(index)} />
  );

  const winner = getWinner(squares);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>X</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        {winner && (
          <p>
            Winner: <span>{winner}</span>
          </p>
        )}
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;
