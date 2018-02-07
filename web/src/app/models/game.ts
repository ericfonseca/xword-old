import { Crossword } from './crossword';

interface GameParams {
  id: string;
  crossword: Crossword;
}

export class Game {
  public id: string;
  public crossword: Crossword;

  constructor(args: GameParams) {
    Object.assign(this, args);
  }
}
