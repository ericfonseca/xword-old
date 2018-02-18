export class Position {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public isEqualTo(o: Position) {
    return this.x === o.x && this.y === o.y;
  }

  public getOffset(o: Position) {
    return {
      x: o.x - this.x,
      y: o.y - this.y,
    };
  }
}
