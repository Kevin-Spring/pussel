const Confetti = ({ color, left, delay, name, duration, timing, iteration }) => {
	const customStyles = {
		left: left,
		animationName: name,
		animationDuration: duration,
		animationTimingFunction: timing,
		animationIterationCount: iteration,
		animationDelay: delay,
	};

	return <span className={`${color} confetti`} style={customStyles}></span>;
};

export default Confetti;
