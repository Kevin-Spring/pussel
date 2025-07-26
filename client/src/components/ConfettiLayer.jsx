import Confetti from './Confetti';
import { confettiConfigurations } from '../utils/confettiConfig';

const ConfettiLayer = () => {
	return (
		<>
			{confettiConfigurations.map((confetti, index) => (
				<Confetti
					key={index}
					color={confetti.color}
					left={confetti.left}
					delay={confetti.delay}
					name={confetti.name}
					duration={confetti.duration}
					timing={confetti.timing}
					iteration={confetti.iteration}
				/>
			))}
		</>
	);
};

export default ConfettiLayer;
