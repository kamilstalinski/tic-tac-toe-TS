import { useState } from "react";
import GameRow from "./components/GameRow";

type GameBoard = [GameBoardRow, GameBoardRow, GameBoardRow];
type GameBoardRow = (PlayersFigure | null)[];
enum PlayersFigure {
  CIRCLE = "O",
  CROSS = "X",
}

function App() {
  const [gameBoardState, setGameBoardState] = useState<GameBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [turnOf, setTurnOf] = useState<PlayersFigure>(
    Math.round(Math.random()) === 1
      ? PlayersFigure.CIRCLE
      : PlayersFigure.CROSS,
  );
  const [result, setResult] = useState<PlayersFigure | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  function handleCellClick(
    rowIndex: number,
    cellIndex: number,
    value: PlayersFigure,
  ) {
    const newGameBoardState = gameBoardState;
    const cellValue = newGameBoardState[rowIndex][cellIndex];
    if (!result) {
      if (cellValue === null) {
        newGameBoardState[rowIndex][cellIndex] = value;
        setGameBoardState(newGameBoardState);
        setTurnOf(
          turnOf === PlayersFigure.CIRCLE
            ? PlayersFigure.CROSS
            : PlayersFigure.CIRCLE,
        );
      }
    }
    const hasWinner = checkWinner(newGameBoardState, value);
    if (hasWinner) {
      setResult(value);
    } else checkDraw(newGameBoardState);
  }

  function checkDraw(board: GameBoard) {
    if (!result && board.every((row) => row.every((cell) => cell !== null)))
      setIsDraw(true);
  }

  function checkWinner(
    board: GameBoard,
    currentPlayer: PlayersFigure,
  ): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentPlayer &&
        board[i][1] === currentPlayer &&
        board[i][2] === currentPlayer
      ) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === currentPlayer &&
        board[1][i] === currentPlayer &&
        board[2][i] === currentPlayer
      ) {
        return true;
      }
    }

    if (
      board[0][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][2] === currentPlayer
    ) {
      return true;
    }
    if (
      board[0][2] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][0] === currentPlayer
    ) {
      return true;
    }
    return false;
  }

  function reset() {
    setGameBoardState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setResult(null);
    setIsDraw(false);
    setTurnOf(
      Math.round(Math.random()) === 1
        ? PlayersFigure.CIRCLE
        : PlayersFigure.CROSS,
    );
  }

  return (
    <>
      <div className='turn'>
        It's <span>"{turnOf}"</span> turn.
      </div>
      {gameBoardState.map((boardRowValue, rowIndex) => {
        return (
          <GameRow
            boardRowValue={boardRowValue}
            rowIndex={rowIndex}
            turnOf={turnOf}
            handleCellClick={handleCellClick}
            key={rowIndex}
          />
        );
      })}
      {result && (
        <div className='popup'>
          <h1 className='winMessage'>{result} wins!</h1>
          <button onClick={reset}>Reset</button>
        </div>
      )}
      {isDraw && (
        <div className='popup'>
          <h1 className='winMessage'>It's a draw!</h1>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </>
  );
}

export default App;
