import { Component, Input, OnInit } from '@angular/core';
import { Game } from '@app/models';

@Component({
  selector: 'xw-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public game: Game;

  constructor() {

  }

  public ngOnInit() {

  }
}
