import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class SpotifyUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const gettingTokenMark ='accounts.spotify';

    //If not spotify API
    if (req.url.includes(gettingTokenMark)) {
      return next.handle(req);
    }

    const baseUrl = environment.API.spotify.baseUrl;
    const url = baseUrl + req.url;
    const apiReq = req.clone({ url });

    return next.handle(apiReq);
  }
}
