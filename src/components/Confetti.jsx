const Confetti = ({
  color,
  left,
  delay,
  name,
  duration,
  timing,
  iteration,
}) => {
  const customStyles = {
    left: left,
    animationName: name,
    animationDuration: duration,
    animationTimingFunction: timing,
    animationIterationCount: iteration,
    animationDelay: delay,
  };

  return (
    <span
      className={`${color} confetti w-4 h-4 fixed left-2/4 -top-1/4 origin-top-left`}
      style={customStyles}
    ></span>
  );
};

export default Confetti;
