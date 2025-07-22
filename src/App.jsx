import { useState } from 'react';
import Game from './game/gameLogic';
import Row from './components/Row';
import Button from './components/Button';
import ConfettiLayer from './components/ConfettiLayer';
import Dialog from './components/Dialog';
import GameContext from './utils/GameContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import { confettiConfigurations } from './data/confettiConfig';

function App() {
	const [game, setGame] = useState(Game.startGame());

	const resetGame = () => {
		setGame(Game.startGame());
	};

	// For testing purposes only (and cheaters haha)
	const simulateWin = () => {
		const finishedBoard = [
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 0], // This represents the winning state
		];
		setGame({ board: finishedBoard, gameOver: true });
	};

	return (
		<GameContext.Provider value={{ game, setGame }}>
			<main className="main">
				<nav className="theme-switcher-container">
					<ThemeSwitcher />
				</nav>

				<section className="section">
					<div className="row">
						<div className="col col-12 offset-r-3 offset-l-3">
							<h1 className="page-title">Pussel</h1>
						</div>
					</div>
					<div className="row">
						<div className="col col-12 offset-r-3 offset-l-3">
							<div className="board-game">
								<div className="board-game-inner">
									{game.board.map((row, rowIndex) => (
										<Row key={rowIndex} rowIndex={rowIndex} row={row} />
									))}
								</div>
								<div className="board-game-controls">
									<Button className={'btn-primary'} text={'Slumpa'} onClick={resetGame} />
									<Button className={'btn-secondary'} text={'Fuska 🤠'} onClick={simulateWin} />
								</div>
							</div>
						</div>
					</div>
				</section>

				<Dialog title={'Vinst!!'} />
				{game.gameOver && <ConfettiLayer />}
			</main>
		</GameContext.Provider>
	);
}

export default App;
