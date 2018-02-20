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
  public selectedClue: Clue;

  constructor(args: GameParams) {
    Object.assign(this, args);

    this.initBoard();
  }

  public previousTile(tile: Tile, direction: Direction) {
    const clue = tile.getClue(direction);
    const {x, y} = clue.position.getOffset(tile.position);
    if (direction === 'A') {
      if (x > 0) {
        return this.getTile({ x: tile.position.x - 1, y: tile.position.y });
      } else if (tile.position.x > 0) {
        for (let i = tile.position.x - 1; i > 0; i--) {
          tile  = this.getTile({ x: i, y: tile.position.y});
          if (tile.value !== -1) {
            return tile;
          }
        }
      }
    } else if (direction === 'D') {
      if (y > 0) {
        return this.getTile({ x: tile.position.x, y: tile.position.y - 1});
      } else if (tile.position.y > 0) {
        for (let i = tile.position.y - 1; i > 0; i--) {
          tile  = this.getTile({ x: tile.position.x, y: i});
          if (tile.value !== -1) {
            return tile;
          }
        }
      }
    }
    return null;
  }

  public nextTile(tile: Tile, direction: Direction) {
    const clue = tile.getClue(direction);
    const {x, y} = clue.position.getOffset(tile.position);
    if (direction === 'A') {
      if (x < clue.tileLength - 1) {
        return this.getTile({ x: tile.position.x + 1, y: tile.position.y });
      } else if (tile.position.x < BOARD_SIZE) {
        for (let i = tile.position.x + 1; i < BOARD_SIZE; i++) {
          tile  = this.getTile({ x: i, y: tile.position.y});
          if (tile.value !== -1) {
            return tile;
          }
        }
      }
    } else if (direction === 'D') {
      if (y < clue.tileLength - 1) {
        return this.getTile({ x: tile.position.x, y: tile.position.y + 1});
      } else if (tile.position.y < BOARD_SIZE) {
        for (let i = tile.position.y + 1; i < BOARD_SIZE; i++) {
          tile  = this.getTile({ x: tile.position.x, y: i});
          if (tile.value !== -1) {
            return tile;
          }
        }
      }
    }
    return null;
  }

  public getTile(position: Position | {x: number, y: number}) {
    return this.board[position.y][position.x];
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
