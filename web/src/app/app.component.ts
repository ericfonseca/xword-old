import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosswordDataService } from '@services/crossword-data.service';
import { Game, Crossword } from '@app/models';

import 'rxjs/add/operator/first';

@Component({
  selector: 'xw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public crosswordIds: String[];
  constructor(
    private crosswordDataService: CrosswordDataService,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.getCrosswords();
  }

  public getCrosswords() {
    this.crosswordDataService.getPuzzles().subscribe((crosswordIds: string[]) => {
      this.crosswordIds = crosswordIds;
      this.createNewGame(crosswordIds[0]);
    });
  }

  public createNewGame(crosswordId) {
    this.crosswordDataService.createNewGame(crosswordId).first().subscribe({
      next: (game: Game) => {
        this.router.navigate(['game', game.id]);
      },
      error: (res) => {
        console.error('error creating game', res);
      },
    });
  }
}
