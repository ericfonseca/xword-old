import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getPlayerId(): string {
    return 'eric';
  }

  public isAuthenticated(): boolean {
    return true;
  }
}
