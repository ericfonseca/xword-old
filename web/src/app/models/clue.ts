import { Position } from './position';

export type Direction = 'A' | 'D';

interface ClueParams {
  number: number;
  position: {x: number, y: number};
  tileLength: number;
  hint: string;
  direction: Direction;
}

export class Clue {
  public number: number;
  public direction: Direction;
  public position: Position;
  public tileLength: number;
  public hint: string;

  constructor(args: ClueParams) {
    Object.assign(this, args);
    this.position = new Position(args.position.x, args.position.y);
  }
}
