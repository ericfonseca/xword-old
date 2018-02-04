import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

import { Crossword, Game, Player } from '@app/models';
import { AppConfig } from '@app/app.config';

interface GameResponse {
  'game_id': string;
}

@Injectable()
export class CrosswordDataService {

  constructor(public http: HttpClient) { }

  public createNewGame(crossword: Crossword, opponent?: Player): Observable<Game> {
    const data = {
      'crossword_name': crossword.id,
      'player_ids': ['eric', 'victoria'],
    };
    return this.http.post(AppConfig.GAME_URL, JSON.stringify(data))
      .map((res: GameResponse) => new Game({ id: res.game_id }));
  }
}
