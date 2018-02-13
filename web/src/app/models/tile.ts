import { Clue } from './clue';
import { Position } from './position';

interface TileClue {
  isStartTile: boolean;
  clue: Clue;
}

interface TileParams {
  clues?: Clue[],
  value?: -1 | string;
  position: Position;
}

export class Tile {
  public associatedClues: TileClue[] = [];
  public value: -1 | string = -1;
  public position: Position;

  constructor(args: TileParams) {
    this.setAttributes(args);
  }

  public setAttributes(args: TileParams) {
    this.value = args.value || -1;
    this.position = new Position(args.position.x, args.position.y);
    if (args.clues) {
      this.clues = args.clues;
    }
  }

  public addClue(clue: Clue) {
    this.associatedClues.push(this.clueToAssociatedClue(clue));
  }

  get displayNumber(): string {
    const startTiles = this.associatedClues.filter((clue) => clue.isStartTile);
    if (startTiles.length) {
      return `${startTiles[0].clue.number}`;
    }
    return '';
  }

  public getClues(): Clue[] {
    return this.associatedClues.map((ascClue: TileClue) => ascClue.clue);
  }

  set clues(clues: Clue[]) {
    clues.forEach((clue) => {
      this.associatedClues.push(this.clueToAssociatedClue(clue));
    });
  }

  private clueToAssociatedClue(clue: Clue): TileClue {
    return {
      isStartTile: clue.position.isEqualTo(this.position),
      clue: clue,
    };
  }
}
