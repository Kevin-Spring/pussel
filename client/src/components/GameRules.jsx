import { useState, useRef, useEffect } from 'react';

const RulesModal = () => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);

	const toggleRules = () => setOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="rules-container" ref={wrapperRef}>
			<button type="button" className="btn btn-square btn-ghost" aria-label="Rules menu" onClick={toggleRules}>
				?
			</button>

			<aside className={`gamerules-window ${open ? 'open' : ''}`}>
				<h2 className="gamerules-title h5">How to Play</h2>
				<ul>
					<li className="sm">🔁 Swap tiles by clicking or tapping on them.</li>
					<li className="sm">🎯 Goal: Arrange all tiles in the correct order, 1 to 15 with the empty tile in the last position.</li>
					<li className="sm">⏱️ The timer starts with your first move.</li>
					<li className="sm">📅 Daily puzzles are the same for everyone each day.</li>
					<li className="sm">🎲 Random puzzles can be played anytime!</li>
					<li className="sm">🏆 Try to solve in as few moves and as little time as possible.</li>
				</ul>
			</aside>
		</div>
	);
};

export default RulesModal;
