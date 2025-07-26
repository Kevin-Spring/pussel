import { useState, useEffect, useRef } from 'react';
import Stats from './Stats';

const StatsToggle = ({ moveCount, timeElapsed, gameOver, mode }) => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);

	const toggleStats = () => {
		setOpen((prev) => !prev);
	};

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
		<div ref={wrapperRef} className="stats-toggle-container">
			<button type="button" className={`mobile-toggle btn btn-square btn-ghost ${open ? 'mobile-menu-open' : ''}`} aria-label="Stats menu" onClick={toggleStats}>
				<div className="mobile-toggle-inner">
					<div className="mobile-dashes"></div>
				</div>
			</button>

			<Stats moveCount={moveCount} timeElapsed={timeElapsed} gameOver={gameOver} mode={mode} open={open} />
		</div>
	);
};

export default StatsToggle;
