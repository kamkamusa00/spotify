import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const gettingTokenMark = 'accounts.spotify';
    if (req.url.includes(gettingTokenMark)) {
      return next.handle(req);
    }
    const modified = req.clone({ headers: this.setHeaders() });
    return next.handle(modified);
  }

  private setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService.tokenIsActive) {
      headers = headers.append(
        'authorization',
        this.authService.interceptorToken
      );
    }

    return headers;
  }
}
