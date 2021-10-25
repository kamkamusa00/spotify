export interface TokenI {
  scope: number;
  refresh_token?: string;
  access_token: string;
  expires_in: string;
  token_type: string;
  date: Date;
}
