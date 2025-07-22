import { useContext } from 'react';
import GameContext from '../utils/GameContext';
import Game from '../game/gameLogic';
import Button from './Button';

const Dialog = ({ title }) => {
	const { game, setGame } = useContext(GameContext);

	const resetGame = () => {
		setGame(Game.startGame());
	};

	return (
		<div className={`${game.gameOver ? 'open' : 'hide'} dialog-window`}>
			<h2 className="dialog-window-title">{title}</h2>
			<Button className={'btn-primary'} text={'Nytt spel'} onClick={resetGame} />
		</div>
	);
};

export default Dialog;
