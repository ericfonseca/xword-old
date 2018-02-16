export class Position {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public isEqualTo(o: Position) {
    return this.x === o.x && this.y === o.y;
  }
}
