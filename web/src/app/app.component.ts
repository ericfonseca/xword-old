import { Component } from '@angular/core';
import { CrosswordDataService } from '@services/crossword-data.service';

@Component({
  selector: 'xw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'xwz';
  constructor(
    public crosswordDataService: CrosswordDataService
  ) {
    //
  }
}
