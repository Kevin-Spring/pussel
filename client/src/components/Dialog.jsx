import { useContext } from 'react';
import GameContext from '../utils/GameContext';
import Button from './Button';

const Dialog = ({ title, message, resetGame }) => {
	const { game } = useContext(GameContext);

	return (
		<div className={`${game.gameOver ? 'open' : 'hide'} dialog-window`}>
			<h2 className="dialog-window-title">{title}</h2>
			{message && <p className="dialog-message">{message}</p>}
			<Button className={'btn-primary'} text={'New game'} onClick={resetGame} />
		</div>
	);
};

export default Dialog;
