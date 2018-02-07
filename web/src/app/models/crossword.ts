import { Clue } from '@app/models';

interface CrosswordParams {
  id?: string;
  date?: Date;
  title?: string;
  clues?: Clue[];
}

export class Crossword {
  public id: string = '123';
  public date: Date = new Date();
  public title: string = 'Untitled Crossword';
  public clues: Clue[];

  constructor(args: CrosswordParams) {
    Object.assign(this, args);
  }
}
