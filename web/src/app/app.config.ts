import { environment } from '@environments/environment';

export const AppConfig = {
  GAME_URL: `${environment.baseUrl}/game`,
  BASE_URL: environment.baseUrl,
};
