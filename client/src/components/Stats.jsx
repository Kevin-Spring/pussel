import { useEffect, useState } from 'react';
import { getLeaderboardResults } from '../services/getLeaderboard';
import { GAME_MODES } from '../utils/gameModes';

function Stats({ open }) {
	const [results, setResults] = useState([]);

	useEffect(() => {
		getLeaderboardResults()
			.then(setResults)
			.catch((err) => console.error('Failed to load leaderboard:', err));
	}, []);

	return (
		<aside className={`stats-window ${open ? 'open' : ''}`}>
			<h2 className="h5 result-title">Leaderboard</h2>
			<ol className="results-list">
				{results.map((r, i) => {
					const date = new Date(r.date).toLocaleDateString(); // locale-sensitive
					const minutes = Math.floor(r.time / 60);
					const seconds = r.time % 60;
					const formattedTime = r.time ? `${minutes}:${seconds.toString().padStart(2, '0')}` : 'N/A';
					const modeLabel = r.isDaily ? '🌟 Daily' : r.mode === GAME_MODES.RANDOM ? '🎲 Random' : '';

					return (
						<li key={i} className="result-item">
							<div className="result-header">
								<span className="result-mode h6">{modeLabel}</span>
								<span className="result-date tn">{date}</span>
							</div>
							<div className="result-details">
								<span className="sm">
									➡️ <strong>{r.moves}</strong>
								</span>
								<span className="sm">
									⏱ <strong>{formattedTime}</strong>
								</span>
							</div>
						</li>
					);
				})}
			</ol>
		</aside>
	);
}

export default Stats;
