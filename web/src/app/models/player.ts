interface PlayerParams {
  name?: string;
  id: string;
}

export class Player {
  public name: string = '';
  public id: string;

  constructor(args: PlayerParams) {
    Object.assign(this, args);
  }
}
