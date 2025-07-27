import { useContext } from 'react';
import GameContext from '../utils/GameContext';
import Game from '../game/gameLogic';

const Tile = ({ rowIndex, columnIndex, columnValue }) => {
	const { game, setGame, moveCount, setMoveCount, setTimerRunning } = useContext(GameContext);

	// Conditionally add classnames to tiles which isn't the empty tile (0)
	const tileClasses = columnValue === 0 ? 'btn btn-square btn-ghost empty' : 'btn btn-square btn-primary';

	return (
		<button
			className={tileClasses}
			key={columnIndex}
			tabIndex={columnValue === 0 ? -1 : 0}
			aria-label={columnValue === 0 ? 'Empty tile' : `Tile ${columnValue}`}
			onClick={() => {
				if (!game.gameOver) {
					if (!game.hasStarted) {
						setTimerRunning(true);
						setGame({ ...game, hasStarted: true });
					}
					Game.move(rowIndex, columnIndex, columnValue, game, setGame, moveCount, setMoveCount);
				}
			}}
		>
			{columnValue}
		</button>
	);
};

export default Tile;
