import { useEffect, useState, useRef } from 'react';
import Game from './game/gameLogic';
import Button from './components/Button';
import Board from './components/Board';
import ConfettiLayer from './components/ConfettiLayer';
import Dialog from './components/Dialog';
import GameContext from './utils/GameContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import GameMeta from './components/GameMeta';
import GameRules from './components/GameRules';
import StatsToggle from './components/StatsToggle';
import { fetchDailyPuzzle } from './services/getDaily';
import { saveResult } from './services/postResults';
import { GAME_MODES } from './utils/gameModes';

function App() {
	const [game, setGame] = useState(Game.createRandomGameState());
	const [moveCount, setMoveCount] = useState(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [mode, setMode] = useState(GAME_MODES.DAILY);
	const [dialogMessage, setDialogMessage] = useState('');
	const [resultsVersion, setResultsVersion] = useState(0);
	const headerRef = useRef(null);

	useEffect(() => {
		const updateHeight = () => {
			if (headerRef.current) {
				const height = headerRef.current.offsetHeight;
				document.documentElement.style.setProperty('--header-height', `${height}px`);
			}
		};

		updateHeight(); // Initial run
		window.addEventListener('resize', updateHeight);

		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	useEffect(() => {
		if (mode === GAME_MODES.DAILY) {
			initializeDailyGame();
		}
	}, [mode]);

	useEffect(() => {
		if (!game.gameOver) return;

		const flatBoard = game.board.flat();
		const isSolved = JSON.stringify(flatBoard) === JSON.stringify(Game.solvedBoard.flat());
		const isDaily = mode === GAME_MODES.DAILY && isSolved;

		const message = isDaily ? "🎉 You solved today's puzzle! Come back tomorrow for a new one." : '✅ Puzzle solved!';

		setDialogMessage(message);

		const result = {
			moves: moveCount,
			time: timeElapsed,
			isDaily,
			mode,
			date: new Date().toISOString(),
		};

		saveResult(result)
			.then(() => setResultsVersion((prev) => prev + 1))
			.catch((err) => console.error('Failed to save result', err));
	}, [game.gameOver]);

	useEffect(() => {
		if (!timerRunning) return;

		const interval = setInterval(() => {
			setTimeElapsed((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timerRunning]);

	const resetGame = (newMode) => {
		const modeToSet = newMode || mode;

		setMoveCount(0);
		setTimeElapsed(0);
		setTimerRunning(false);
		setDialogMessage('');
		setMode(modeToSet);

		if (modeToSet === GAME_MODES.DAILY) {
			fetchDailyPuzzle()
				.then((board) => {
					setGame({ board, gameOver: false, hasStarted: false });
				})
				.catch((err) => {
					console.error('Failed to fetch daily seed:', err);
					setGame(Game.createRandomGameState());
				});
		} else {
			setGame(Game.createRandomGameState());
		}
	};

	const cheatSolveCurrent = () => {
		setGame({ board: Game.solvedBoard, gameOver: true, hasStarted: true });
		setTimerRunning(false);
	};

	const initializeDailyGame = () => {
		fetchDailyPuzzle()
			.then((board) => {
				setGame({ board, gameOver: false, hasStarted: false });
				setMoveCount(0);
				setTimeElapsed(0);
				setDialogMessage('');
			})
			.catch((err) => console.error('Failed to fetch daily seed:', err));
	};

	return (
		<GameContext.Provider
			value={{
				game,
				setGame,
				moveCount,
				setMoveCount,
				timeElapsed,
				setTimeElapsed,
				setTimerRunning,
				mode,
			}}
		>
			<main className="main">
				<header className="header" ref={headerRef} aria-label="header">
					<div className="row">
						<div className="col col-12">
							<nav aria-label="Game information">
								<div className="controls-container">
									<ThemeSwitcher />
									<GameRules />
								</div>
								<div className="stats-container">
									<GameMeta />
									<StatsToggle resultsVersion={resultsVersion} />
								</div>
							</nav>
						</div>
					</div>
				</header>

				<section className="section">
					<div className="row">
						<div className="col col-12 offset-r-3 offset-l-3">
							<div className="current-mode-label text-center">{mode === GAME_MODES.DAILY ? <h1>Daily Puzzle</h1> : <h1>Random Puzzle</h1>}</div>
							<div className="mode-toggle justify-center">
								<Button className={mode === GAME_MODES.DAILY ? 'btn-primary' : 'btn-secondary'} text="Daily Puzzle" onClick={() => resetGame(GAME_MODES.DAILY)} />
								<Button className={mode === GAME_MODES.RANDOM ? 'btn-primary' : 'btn-secondary'} text="Random Puzzle" onClick={() => resetGame(GAME_MODES.RANDOM)} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col col-12 offset-r-3 offset-l-3">
							<Board resetGame={resetGame} cheatSolveCurrent={cheatSolveCurrent} />
						</div>
					</div>
				</section>

				<Dialog title="Congrats!!" message={dialogMessage} resetGame={() => resetGame(mode)} />
				{game.gameOver && <ConfettiLayer />}
			</main>
		</GameContext.Provider>
	);
}

export default App;
