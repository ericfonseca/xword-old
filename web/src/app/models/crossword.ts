interface CrosswordParams {
  id: string;
}

export class Crossword {
  public id: string;

  constructor(args: CrosswordParams) {
    Object.assign(this, args);
  }
}
