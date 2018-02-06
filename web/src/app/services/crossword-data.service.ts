import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

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
      'crossword_id': crossword.id,
      'player_ids': ['eric', 'victoria'],
    };
    return this.http.post(AppConfig.GAME_URL, JSON.stringify(data))
      .mergeMap((res: GameResponse) => {
        return this.getGame(res.game_id);
      });
  }

  public getGame(gameId: string): Observable<Game> {
    return this.http.get(AppConfig.GAME_URL + `/${gameId}`)
      .map((data) => {
        return new Game({id: gameId});
      });
  }
}
