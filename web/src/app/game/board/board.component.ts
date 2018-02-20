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
      this.selectedTile = this.previousTile(this.direction);
    } else {
      this.selectedTile = this.nextTile(this.direction);
    }
  }

  public changeDirection() {
    this.direction = this.direction === 'A' ? 'D' : 'A';
  }

  private previousTile(direction: Direction) {
    const prev = this.game.previousTile(this.selectedTile, direction);
    return prev || this.selectedTile;
  }

  private nextTile(direction: Direction) {
    const next = this.game.nextTile(this.selectedTile, direction);
    return next || this.selectedTile;
  }

  public onArrowPress(tile: Tile, evt: KeyboardEvent) {
    console.log(evt);
    switch (evt.key) {
      case 'ArrowDown':
        this.selectedTile = this.nextTile('D');
        break;
      case 'ArrowUp':
        this.selectedTile = this.previousTile('D');
        break;
      case 'ArrowLeft':
        this.selectedTile = this.previousTile('A');
        break;
      case 'ArrowRight':
        this.selectedTile = this.nextTile('A');
        break;
    }
    this.game.selectedClue = this.selectedTile.getClue(this.direction);
  }
}
