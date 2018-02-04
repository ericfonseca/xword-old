interface GameParams {
  id: string;
}

export class Game {
  public id: string;

  constructor(args: GameParams) {
    Object.assign(this, args);
  }
}
