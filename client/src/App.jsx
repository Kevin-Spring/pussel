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
	const [game, setGame] = useState(Game.startGame());
	const [dailySeed, setDailySeed] = useState(null);
	const [moveCount, setMoveCount] = useState(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [mode, setMode] = useState(GAME_MODES.DAILY);
	const [dialogMessage, setDialogMessage] = useState('');
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
		if (mode !== GAME_MODES.DAILY) return;

		fetchDailyPuzzle()
			.then((board) => {
				setGame({ board, gameOver: false, hasStarted: false });
				setMoveCount(0);
				setTimeElapsed(0);
			})
			.catch((err) => {
				console.error('Failed to fetch daily seed:', err);
			});
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

		saveResult(result).catch((err) => console.error('Failed to save result', err));
	}, [game.gameOver]);

	useEffect(() => {
		if (!timerRunning) return;

		const interval = setInterval(() => {
			setTimeElapsed((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timerRunning]);

	const resetGame = (newMode) => {
		setMoveCount(0);
		setTimeElapsed(0);
		setTimerRunning(false);
		setDialogMessage('');
		setDailySeed(null);

		if (newMode === GAME_MODES.DAILY) {
			setMode(GAME_MODES.DAILY);
			setGame(Game.startGame());
		} else {
			setGame(Game.createRandomGameState());
			setMode(GAME_MODES.RANDOM);
		}
	};

	const cheatSolveCurrent = () => {
		setGame({ board: Game.solvedBoard, gameOver: true, hasStarted: true });
		setTimerRunning(false);
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
			}}
		>
			<main className="main">
				<header className="header" ref={headerRef}>
					<div className="row">
						<div className="col col-12">
							<nav>
								<div className="controls-container">
									<ThemeSwitcher />
									<GameRules />
								</div>
								<div className="stats-container">
									<GameMeta moveCount={moveCount} timeElapsed={timeElapsed} />
									<StatsToggle moveCount={moveCount} timeElapsed={timeElapsed} gameOver={game.gameOver} mode={mode} />
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
							<Board game={game} mode={mode} resetGame={resetGame} cheatSolveCurrent={cheatSolveCurrent} />
						</div>
					</div>
				</section>

				<Dialog title="Congrats!!" message={dialogMessage} resetGame={resetGame} />

				{game.gameOver && <ConfettiLayer />}
			</main>
		</GameContext.Provider>
	);
}

export default App;
