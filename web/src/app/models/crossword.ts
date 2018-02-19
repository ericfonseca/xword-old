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
  private _clues: Clue[] = [];
  private cluesByDirection: { A: Clue[], D: Clue[] };

  constructor(args: CrosswordParams) {
    this.id = args.id || this.id;
    this.date = args.date || this.date;
    this.clues = args.clues || this._clues;
    this.title = args.title;
  }

  set clues(clues: Clue[]) {
    clues.sort((a, b) => a.number - b.number);
    this._clues = clues;

    this.cluesByDirection = {A: [], D: []};

    this._clues.forEach((clue) => {
      this.cluesByDirection[clue.direction].push(clue);
    });
  }

  get clues() {
    return this._clues;
  }

  get acrossClues() {
    return this.cluesByDirection['A'];
  }

  get downClues() {
    return this.cluesByDirection['D'];
  }
}
