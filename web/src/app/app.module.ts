import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './game/board/board.component';

import { CoreModule } from '@app/core/core.module';
import { TileComponent } from './game/tile/tile.component';
import { GameComponent } from './game/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    GameComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
