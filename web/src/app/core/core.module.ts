import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from '@services/interceptors/token.interceptor';

import { AuthService } from '@services/auth.service';
import { CrosswordDataService } from '@services/crossword-data.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    CrosswordDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }
