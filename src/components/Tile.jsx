import { useContext } from "react";
import GameContext from "../utils/GameContext";
import Game from "../game/gameLogic";

const Tile = ({ rowIndex, columnIndex, columnValue }) => {
  const { game, setGame } = useContext(GameContext);

  // Conditionally add classnames to tiles which isn't the empty tile (0)
  const tileClasses =
    columnValue === 0
      ? "btn btn-square btn-ghost"
      : "btn btn-square btn-primary";

  return (
    <button
      className={tileClasses}
      key={columnIndex}
      onClick={() => {
        Game.move(rowIndex, columnIndex, columnValue, game, setGame);
      }}
    >
      {columnValue}
    </button>
  );
};

export default Tile;
