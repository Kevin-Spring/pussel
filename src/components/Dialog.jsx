import Button from "./Button";

const Dialog = ({ resetGame, title }) => {
  return (
    <dialog
      open
      className="fixed left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 backdrop-blur-md bg-white/50 p-8 py-20 rounded text-white font-semibold text-center w-96 max-w-md border flex justify-center items-center flex-col"
    >
      <h2 className="text-4xl text-black font-bold">{title}</h2>
      <Button text={"Nytt spel"} resetGame={resetGame} />
    </dialog>
  );
};

export default Dialog;
