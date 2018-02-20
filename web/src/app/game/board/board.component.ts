import { Component, Input, OnInit } from '@angular/core';
import { Clue, Direction, Game, Tile } from '@app/models';

@Component({
  selector: 'xw-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() public game: Game;
  public selectedTile: Tile;
  public direction: Direction = 'A';

  constructor() {}

  public ngOnInit() {

  }

  public onTileSelected(tile: Tile) {
    if (tile.value === -1) {
      return;
    }

    if (this.selectedTile === tile) {
      this.changeDirection();
    }

    this.selectedTile = tile;
    this.game.selectedClue = tile.getClue(this.direction);
  }

  public onTileUpdated(tile) {
    if (this.selectedTile.value === '') {
      this.selectedTile = this.previousTile();
    } else {
      this.selectedTile = this.nextTile();
    }
  }

  public changeDirection() {
    this.direction = this.direction === 'A' ? 'D' : 'A';
  }

  private previousTile() {
    const prev = this.game.previousTile(this.selectedTile, this.direction);
    return prev || this.selectedTile;
  }

  private nextTile() {
    const next = this.game.nextTile(this.selectedTile, this.direction);
    return next || this.selectedTile;
  }
}
