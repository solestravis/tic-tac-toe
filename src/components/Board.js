import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import style from "./Board.module.scss";

const Board = () => {
  const emptyGame = {
    rows: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    columns: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [playsCount, setPlaysCount] = useState(0);
  const [lastMove, setLastMove] = useState({ x: null, y: null });
  const [boardResults, setBoardResults] = useState({
    ...emptyGame,
  });

  useEffect(() => {
    const playerToCheck = currentPlayer === "X" ? "O" : "X";
    if (playsCount >= 5) {
      checkDiagonalMatch(playerToCheck);
      checkLineMatch(playerToCheck);
    }
  }, [playsCount]);

  const checkLineMatch = (player) => {
    const { x, y } = lastMove;
    const rowValues = boardResults["rows"][x].filter(
      (value) => value === player
    );
    const columnValues = boardResults["columns"][y].filter(
      (value) => value === player
    );
    if (rowValues.length === 3 || columnValues.length === 3) {
      setWinner(player);
    }
  };

  const checkDiagonalMatch = (player) => {
    const diagonalPairsTop = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const diagonalPairsBottom = [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ];
    const diagonalMatchRowsTop = diagonalPairsTop.filter(
      ({ x, y }) => boardResults["rows"][x][y] === player
    );
    const diagonalMatchRowsBottom = diagonalPairsBottom.filter(
      ({ x, y }) => boardResults["rows"][x][y] === player
    );
		const diagonalWin = diagonalMatchRowsTop.length === 3 || diagonalMatchRowsBottom.length === 3;
    setWinner(diagonalWin && player);
  };

  const handleResetClick = () => {
    setBoardResults({ ...emptyGame });
    setCurrentPlayer('X');
    setPlaysCount(0);
    setWinner(null);
    setLastMove({ x: null, y: null });
  };

  const handleTileClick = (index) => {
    const { x, y } = index;
    let results = { ...boardResults };
    results["rows"][x][y] = currentPlayer;
    results["columns"][y][x] = currentPlayer;

    setBoardResults(results);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setLastMove({ x, y });
    setPlaysCount(playsCount + 1);
  };

  return (
    <>
      <button onClick={handleResetClick}>Reset game</button>
      <h2>Next turn: {currentPlayer}</h2>
      <h2>Winner: {winner && winner}</h2>
      <div className={style.board}>
        {boardResults.rows.map((row, x) => (
          <div className={style.row} key={x}>
            {row.map((playerValue, y) => (
              <Tile
                playerValue={playerValue}
                index={{ x, y }}
                key={`${x}-${y}`}
                onClick={handleTileClick}
								disabled={winner || playerValue.length}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
