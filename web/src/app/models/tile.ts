import { Clue } from './clue';
import { Position } from './position';

interface TileClue {
  isStartTile: boolean;
  clue: Clue;
}

interface TileParams {
  clues: Clue[],
  value: -1 | string;
  position: Position;
}

export class Tile {
  public associatedClues: TileClue[] = [];
  public value: -1 | string;
  public position: Position;

  constructor(args: TileParams) {
    this.value = args.value;
    this.position = new Position(args.position.x, args.position.y);
    args.clues.forEach((clue) => {
      this.associatedClues.push({
        isStartTile: clue.position.isEqualTo(this.position),
        clue: clue,
      });
    })
  }
}
