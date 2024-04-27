import { useState } from "react";
import Game from "./game/gameLogic";
import Row from "./components/Row";
import Button from "./components/Button";
import Confetti from "./components/Confetti";
import Dialog from "./components/Dialog";
import GameContext from "./utils/GameContext";
import { confettiConfigurations } from "./data/confettiConfig";

function App() {
  const [game, setGame] = useState(Game.startGame());

  const resetGame = () => {
    setGame(Game.startGame());
  };

  // For testing purposes only (and cheaters)
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
      <main className="bg-white min-h-lvh w-screen flex flex-col items-center justify-center max-w-screen-2xl my-0 mx-auto">
        <section className="flex items-center justify-center flex-col w-full py-24 max-w-screen-lg mx-auto my-0 px-5">
          <h1 className="text-9xl uppercase font-bold text-balance break-all text-center mb-10">
            Grebban
          </h1>

          <div className="board-game flex flex-col gap-y-4 border-2 border-black rounded p-2">
            {game.board.map((row, rowIndex) => (
              <Row key={rowIndex} rowIndex={rowIndex} row={row} />
            ))}
          </div>

          <Button text={"Slumpa"} resetGame={resetGame} />

          <button
            className="font-bold text-xlg text-black py-2 px-6 flex justify-center items-center bg-white border rounded mt-5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-zinc-100 active:bg-zinc-200"
            onClick={simulateWin}
          >
            Fuska 🤠
          </button>
        </section>

        {game.gameOver && (
          <>
            <Dialog resetGame={resetGame} title={"Vinst!!"} />

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
        )}
      </main>
    </GameContext.Provider>
  );
}

export default App;
