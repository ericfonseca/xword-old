import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrosswordDataService } from '@services/crossword-data.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    CrosswordDataService,
  ],
})
export class CoreModule { }
