import { Clue } from './clue';

interface GameParams {
  id: string;
  clues: Clue[];
}

export class Game {
  public id: string;
  public clues: Clue[];

  constructor(args: GameParams) {
    Object.assign(this, args);
  }
}
