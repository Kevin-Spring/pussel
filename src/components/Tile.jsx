import { useContext } from "react";
import GameContext from "../utils/GameContext";
import Game from "../game/gameLogic";

const Tile = ({ rowIndex, columnIndex, columnValue }) => {
  const { game, setGame } = useContext(GameContext);

  // Conditionally add classnames to tiles which isn't the empty tile (0)
  const tileClasses =
    columnValue === 0
      ? "opacity-0 invisible"
      : "board-game-tile text-white-100 font-bold text-lg py-1.5 px-2.5 flex justify-center items-center bg-black rounded aspect-square transition-colors duration-200 ease-in-out text-white hover:cursor-pointer hover:bg-stone-800 active:bg-stone-700";

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
