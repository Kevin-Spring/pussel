import Row from './Row';
import Button from './Button';
import { GAME_MODES } from '../utils/gameModes';

function Board({ game, mode, resetGame, cheatSolveCurrent }) {
	if (!Array.isArray(game.board)) {
		return <p>Loading puzzle...</p>;
	}

	return (
		<div className="board-game">
			<div className="board-game-inner">
				{game.board.map((row, rowIndex) => (
					<Row key={rowIndex} rowIndex={rowIndex} row={row} />
				))}
			</div>
			<div className="board-game-controls">
				{mode === GAME_MODES.RANDOM && <Button className="btn-primary" text="Reset Game" onClick={() => resetGame(GAME_MODES.RANDOM)} />}
				<Button className="btn-secondary" text="Cheat 👾" onClick={cheatSolveCurrent} />
			</div>
		</div>
	);
}

export default Board;
