import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Crossword, Game, Player } from '@app/models';
import { AppConfig } from '@app/app.config';

interface GameResponse {
  'game_id': string;
}

@Injectable()
export class CrosswordDataService {

  constructor(public httpClient: HttpClient) { }

  public createNewGame(crossword: Crossword, opponent?: Player): Observable<Game> {
    return this.httpClient.post(AppConfig.GAME_URL, {
      'crossword_name': crossword.id,
      'player_ids': ['eric', 'victoria'],
    }).map((res: GameResponse) => new Game({ id: res.game_id }));
  }
}
