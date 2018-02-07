import { Component, Input, OnInit } from '@angular/core';
import { Game } from '@app/models';

type Tile = -1 | string;
const BOARD_SIZE = 10;

@Component({
  selector: 'xw-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public game: Game;
  public board: Tile[][];

  constructor() {
    this.initBoard();
  }

  public ngOnInit() {
    this.populateBoard();
  }

  private initBoard() {
    this.board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = [];
      for(let j = 0; j < BOARD_SIZE; j++) {
        row.push(-1);
      }
      this.board.push(row);
    }
  }

  private populateBoard() {
    const { crossword } = this.game;
    crossword.clues.forEach((clue) => {
      let [x, y] = [clue.position.x, clue.position.y];
      for (let i = 0; i < clue.tileLength; i++) {
        this.board[x][y] = '';
        if (clue.direction === 'A') {
          x++;
        } else {
          y++;
        }
      }
    });
  }

}
