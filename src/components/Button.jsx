const Button = ({ text, resetGame }) => {
  return (
    <button
      className="font-bold text-xlg text-white py-2 px-6 flex justify-center items-center bg-black rounded mt-5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-stone-800 active:bg-stone-700"
      onClick={() => {
        resetGame();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
