import { useContext } from 'react';
import GameContext from '../utils/GameContext';

const GameMeta = () => {
	const { moveCount, timeElapsed } = useContext(GameContext);
	return (
		<div className="game-meta">
			<p aria-label={`move count: ${moveCount}`}>➡️ {moveCount}</p>
			<p aria-label={`time elapsed: ${timeElapsed} seconds`}>⏱ {timeElapsed}s</p>
		</div>
	);
};

export default GameMeta;
