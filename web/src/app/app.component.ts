import { Component, OnInit } from '@angular/core';
import { CrosswordDataService } from '@services/crossword-data.service';
import { Game } from '@app/models';

import 'rxjs/add/operator/first';

@Component({
  selector: 'xw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public game: Game;
  constructor(
    public crosswordDataService: CrosswordDataService,
  ) { }

  public ngOnInit() {
    //
  }

  public createNewGame() {
    this.crosswordDataService.createNewGame({
      id: '1',
    }).first().subscribe({
      next: (game: Game) => {
        this.game = game;
      },
      error: (res) => {
        console.error('error creating game', res);
      },
    });
  }
}
