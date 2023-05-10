type GameBoardRow = (PlayersFigure | null)[];
type CellProps = {
  boardRowValue: GameBoardRow;
  rowIndex: number;
  turnOf: PlayersFigure;
  handleCellClick: (
    rowIndex: number,
    cellIndex: number,
    value: PlayersFigure,
  ) => void;
};
enum PlayersFigure {
  CIRCLE = "O",
  CROSS = "X",
}

export default function Cell({
  boardRowValue,
  rowIndex,
  turnOf,
  handleCellClick,
}: CellProps) {
  return (
    <div style={{ display: "flex", color: "black" }} key={rowIndex}>
      {boardRowValue.map((boardCellValue, cellIndex) => {
        return (
          <div
            className='cell'
            key={rowIndex + cellIndex}
            onClick={() => handleCellClick(rowIndex, cellIndex, turnOf)}>
            {boardCellValue}
          </div>
        );
      })}
    </div>
  );
}
