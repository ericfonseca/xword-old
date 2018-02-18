import { Crossword } from './crossword';
import { Tile } from './tile';
import { Position } from './position';
import { Clue, Direction } from './clue';

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
      for (let j = 0; j < BOARD_SIZE; j++) {
        row.push(new Tile({
          position: new Position(j, i),
        }));
      }
      this.board.push(row);
    }

    this.populateBoard();
  }

  public nextTile(tile: Tile, direction: Direction) {
    const clue = tile.getClue(direction);
    const {x, y} = clue.position.getOffset(tile.position);
    if (direction === 'A' && x < clue.tileLength - 1) {
      return this.board[tile.position.x + 1][tile.position.y];
    } else if (direction === 'D' && y < clue.tileLength - 1) {
      return this.board[tile.position.x][tile.position.y + 1];
    }
    return null;
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
