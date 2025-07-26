const GameMeta = ({ moveCount, timeElapsed }) => {
	return (
		<div className="game-meta">
			<p>➡️ {moveCount}</p>
			<p>⏱ {timeElapsed}s</p>
		</div>
	);
};

export default GameMeta;
