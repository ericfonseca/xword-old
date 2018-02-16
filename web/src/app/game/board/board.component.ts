import { Component, Input, OnInit } from '@angular/core';
import { Clue, Direction, Game, Tile } from '@app/models';

@Component({
  selector: 'xw-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public game: Game;
  public selectedClue: Clue;
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
    try {
      this.selectedClue = tile.getClues().filter((clue) => clue.direction === this.direction)[0];
    } catch(_) {
      this.selectedClue = tile.getClues()[0];
    }
  }

  public changeDirection() {
    this.direction = this.direction === 'A' ? 'D' : 'A';
  }
}
