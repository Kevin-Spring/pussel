export default class Game {
  // Setup the state of the game
  static startGame() {
    return {
      gameOver: false,
      board: this.randomizeBoard(),
    };
  }

  static checkComplete(board) {
    // Since the array.every() method returns true if an array is empty
    // We need to check if the board array is empty before continuing
    if (board.length === 0) {
      return false;
    }

    const finishedBoard = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];

    // Flatten both arrays and then compare each element for a possible match
    // returns falsy as soon as one element in the compared array doesn't reflect the other
    return board.flat().every((value, index) => {
      return value === finishedBoard.flat()[index];
    });
  }

  // Randomize the board on initial load, on randomization request and on new game request
  static randomizeBoard() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // Shuffle the numbers array using the Fisher-Yates shuffle algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomNumber = Math.floor(Math.random() * (i + 1));
      // Swap the elements at indices index and randomNumber in the numbers array
      [numbers[i], numbers[randomNumber]] = [numbers[randomNumber], numbers[i]];
    }

    // Place the shuffled numbers onto the board
    let index = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // Check if there are remaining numbers to place on the board
        if (index < numbers.length) {
          // Assign the number at the current index of the shuffled numbers array to the board
          board[i][j] = numbers[index];
          // Move to the next number in the shuffled numbers array
          index++;
        }
      }
    }

    return board;
  }

  // Move all tiles to the right of the empty position up to the clicked tile position
  static moveLeft(row, col, value, board) {
    let moved = false;
    // Loop from the clicked tile starting at the direct adjacent tile to the left until the zero or the edge of the board side is reached
    for (let c = col - 1; c >= 0; c--) {
      // The zero is found
      if (board[row][c] === 0) {
        // Starts the loop from the column where the empty tile (0) was found
        for (let i = c; i < col; i++) {
          // Shift tiles to the left located in the same row as the zero by replacing the value with the adjacent one
          board[row][i] = board[row][i + 1];
        }
        board[row][col] = 0; // Place the clicked tile at the empty position
        moved = true;
        break;
      }
    }
    return moved;
  }

  // Move the clicked tile and any tiles to its right to the right-most empty position
  static moveRight(row, col, value, board) {
    let moved = false;

    for (let c = col + 1; c < board[row].length; c++) {
      if (board[row][c] === 0) {
        for (let i = c; i > col; i--) {
          board[row][i] = board[row][i - 1];
        }
        board[row][col] = 0;
        moved = true;
        break;
      }
    }
    return moved;
  }

  // Move the clicked tile and any tiles below it down to the bottom-most empty position
  static moveDown(row, col, value, board) {
    let moved = false;

    for (let r = row + 1; r < board.length; r++) {
      if (board[r][col] === 0) {
        for (let i = r; i > row; i--) {
          board[i][col] = board[i - 1][col];
        }
        board[row][col] = 0;
        moved = true;
        break;
      }
    }
    return moved;
  }

  // Move all tiles below the empty position up to the clicked tile position
  static moveUp(row, col, value, board) {
    let moved = false;

    for (let r = row - 1; r >= 0; r--) {
      if (board[r][col] === 0) {
        for (let i = r; i < row; i++) {
          board[i][col] = board[i + 1][col];
        }
        board[row][col] = 0;
        moved = true;
        break;
      }
    }
    return moved;
  }

  // Handle tile movement based on the clicked tile's position
  static move(row, col, value, game, setGame) {
    const board = game.board;

    // Call appropriate move methods based on the clicked tile's position
    // If any returns true see how the state of the game is via the checkComplete method
    if (
      this.moveUp(row, col, value, board) ||
      this.moveRight(row, col, value, board) ||
      this.moveDown(row, col, value, board) ||
      this.moveLeft(row, col, value, board)
    ) {
      // If any move was successful, check for completion
      if (this.checkComplete(board)) {
        setGame({ board, gameOver: true }); // Update game state if game is complete
      } else {
        setGame({ board }); // Update game state
      }
    }
  }
}
