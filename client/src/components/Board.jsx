import { useContext } from 'react';
import Row from './Row';
import Button from './Button';
import GameContext from '../utils/GameContext';
import { GAME_MODES } from '../utils/gameModes';

function Board({ resetGame, cheatSolveCurrent }) {
	const { game, mode } = useContext(GameContext);

	if (!Array.isArray(game.board)) {
		return <p>Loading puzzle...</p>;
	}

	return (
		<div className="board-game" aria-label="Puzzle board">
			<div className="board-game-inner">
				{game.board.map((row, rowIndex) => (
					<Row key={rowIndex} rowIndex={rowIndex} row={row} />
				))}
			</div>
			<div className="board-game-controls">
				{mode === GAME_MODES.RANDOM && <Button className="btn-primary" text="New Game" onClick={() => resetGame(GAME_MODES.RANDOM)} />}
				{mode === GAME_MODES.DAILY && <Button className="btn-primary" text="Reset Game" onClick={() => resetGame(GAME_MODES.DAILY)} />}
				<Button className="btn-secondary" text="Cheat 👾" onClick={cheatSolveCurrent} />
			</div>
		</div>
	);
}

export default Board;
