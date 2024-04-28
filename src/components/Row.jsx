import Tile from "./Tile";

const Row = ({ rowIndex, row }) => {
  return (
    <div className="board-game-row grid grid-cols-4 gap-4" key={rowIndex}>
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
