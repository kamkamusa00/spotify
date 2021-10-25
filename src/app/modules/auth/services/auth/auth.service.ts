import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TokenI } from '../../models/token.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { getQueryParam } from '@shared/utils/getQueryParam.lib';
import { ErrorManagerService } from 'src/app/modules/core/services/error-manager/error-manager.service';

const { client_id, redirect_uri, authUrl, client_secret } =
  environment.API.spotify;

const headers = {
  Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
  'Content-Type': 'application/x-www-form-urlencoded'
};

@Injectable()
export class AuthService {
  token!: TokenI;
  code = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorManager: ErrorManagerService,
    private location: Location
  ) {}

  get interceptorToken(): string {
    return `${this.token.token_type} ${this.token.access_token}`;
  }

  tokenIsActive(token = this.token): boolean {
    return !!getTimeToExpire(token);
  }

  init(activeRoute: ActivatedRoute): void {
    if (!this.tryLoadTokenFromStorage()) {
      this.getCode(activeRoute);
      if (this.code) {
        this.getToken();
      } else {
        this.gotoSpotifyAutorizationPage();
      }
    }
  }

  private gotoSpotifyAutorizationPage(): void {
    const queryParams = new URLSearchParams();
    queryParams.set('response_type', 'code');
    queryParams.set('client_id', client_id);
    queryParams.set('redirect_uri', redirect_uri);
    queryParams.set(
      'scope',
      encodeURI(
        'user-follow-modify playlist-read-private playlist-modify-private playlist-modify-public'
      )
    );

    const url = authUrl + 'authorize?' + queryParams.toString();

    window.location.href = url; // Go to spotify autorization page
  }

  private tryLoadTokenFromStorage(): boolean {
    try {
      const token = JSON.parse(sessionStorage.getItem('TOKEN') || '') as TokenI;
      if (token?.access_token && this.tokenIsActive(token)) {
        this.setToken(token);
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  private getToken(): void {
    const url = authUrl + 'api/token';
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', this.code);
    body.set('redirect_uri', encodeURI(redirect_uri));

    this.http
      .post<TokenI>(url, body.toString(), { headers })
      .pipe(
        map((token: TokenI) => ({ ...token, date: new Date() })) //add hour we recieve token
      )
      .subscribe(
        (token: TokenI) => {
          if (token?.access_token) {
            this.setToken(token);
          }
        },
        (error: HttpErrorResponse) => this.errorManager.showError(error)
      );
  }

  private getRefreshToken(): void {
    console.log('refresh token');
    const url = authUrl + 'api/token';
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', client_id);
    body.set('refresh_token', this.token.refresh_token);

    this.http
      .post<TokenI>(url, body.toString(), {
        headers
      })
      .pipe(
        map((token: TokenI) => ({ ...token, date: new Date() })) //add the time it recieves token
      )
      .subscribe(
        (token: TokenI) => {
          if (token?.access_token) {
            this.setToken(token);
          }
        },
        (error: HttpErrorResponse) => this.errorManager.showError(error)
      );
  }

  private setToken(token: TokenI) {
    this.token = { ...this.token, ...token };
    sessionStorage.setItem('TOKEN', JSON.stringify(token));
    this.setTimeOutRefresh();
    const path = this.location.path();
    if (path == '' || path == '/' || path.includes('?code')) {
      this.router.navigate(['/private']);
    }
  }

  private getCode(activeRoute: ActivatedRoute): void {
    if (this.code) {
      return;
    }
    const code = getQueryParam(activeRoute, 'code');
    if (code) {
      this.code = code;
    }
  }

  private setTimeOutRefresh(): boolean {
    const timeToExpire = getTimeToExpire(this.token);
    const oneMinuteInMs = 1 * 60 * 1000;
    const timeToRefresh = timeToExpire - oneMinuteInMs;
    if (timeToExpire) {
      setTimeout(() => {
        this.getRefreshToken();
      }, timeToRefresh);
      return false;
    } else {
      return false;
    }
  }
}

function getTimeToExpire(token: TokenI): number {
  if (!token?.access_token) {
    return 0;
  }
  const tokenExpiresDate = dayjs(token.date).add(
    Number(token.expires_in),
    'second'
  );
  const timeToExpire = tokenExpiresDate.diff(new Date());
  return timeToExpire > 0 ? timeToExpire : 0;
}
