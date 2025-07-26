import Tile from "./Tile";

const Row = ({ rowIndex, row }) => {
  return (
    <div className="board-game-row" key={rowIndex}>
      {row.map((columnValue, columnIndex) => (
        <Tile
          key={columnIndex}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          columnValue={columnValue}
        />
      ))}
    </div>
  );
};

export default Row;
