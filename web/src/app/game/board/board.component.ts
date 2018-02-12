import { Component, Input, OnInit } from '@angular/core';
import { Game, Clue } from '@app/models';

@Component({
  selector: 'xw-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public game: Game;
  private selectedClue: Clue;

  constructor() {}

  public ngOnInit() {

  }
}
