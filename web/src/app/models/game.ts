import { Crossword } from './crossword';
import { Tile } from './tile';
import { Position } from './position';

const BOARD_SIZE = 15;

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
        row.push(new Tile({
          position: new Position(j, i),
        }));
      }
      this.board.push(row);
    }

    this.populateBoard();
  }

  private populateBoard() {
    this.crossword.clues.forEach((clue) => {
      let [x, y] = [clue.position.x, clue.position.y];
      for (let i = 0; i < clue.tileLength; i++) {
        const tile = this.board[y][x];
        tile.addClue(clue);
        tile.value = '';
        if (clue.direction === 'A') {
          x++;
        } else {
          y++;
        }
      }
    });
  }
}
