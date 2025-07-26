const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`btn ${className}`}
			onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
