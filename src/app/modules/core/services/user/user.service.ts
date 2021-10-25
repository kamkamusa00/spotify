import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UserI } from 'src/app/modules/auth/models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  user!: UserI;

  getCurrentUser(): Observable<UserI> {
    if (this.user) {
      return of({ ...this.user });
    }

    const url = 'v1/me';
    return this.http
      .get<UserI>(url)
      .pipe(tap((user: UserI) => (this.user = user)));
  }
}
