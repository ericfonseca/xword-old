import { Component, Input, OnInit } from '@angular/core';
import { Game } from '@app/models';

@Component({
  selector: 'xw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() public game: Game;
  constructor() { }

  public ngOnInit() {
  }

}
