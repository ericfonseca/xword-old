import { Crossword } from './crossword';

type Tile = -1 | string;
const BOARD_SIZE = 10;

interface GameParams {
  id: string;
  crossword: Crossword;
}

export class Game {
  public id: string;
  public crossword: Crossword;
  public board: Tile[][];

  constructor(args: GameParams) {
    Object.assign(this, args);

    this.initBoard();
  }

  private initBoard() {
    this.board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = [];
      for(let j = 0; j < BOARD_SIZE; j++) {
        row.push(-1);
      }
      this.board.push(row);
    }

    this.populateBoard();
  }

  private populateBoard() {
    this.crossword.clues.forEach((clue) => {
      let [x, y] = [clue.position.x, clue.position.y];
      for (let i = 0; i < clue.tileLength; i++) {
        this.board[x][y] = '';
        if (clue.direction === 'A') {
          x++;
        } else {
          y++;
        }
      }
    });
  }
}
