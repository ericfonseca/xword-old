import { Component, Input, OnInit } from '@angular/core';
import { Clue, Tile } from '@app/models';

@Component({
  selector: 'xw-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() public tile: Tile;

  constructor() { }

  public ngOnInit() {
  }

}
