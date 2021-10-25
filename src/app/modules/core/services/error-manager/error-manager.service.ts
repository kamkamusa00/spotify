import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorManagerService {
  constructor() {}

  showError(error: HttpErrorResponse): void {
    alert(error.message); //TODO install material UI or other library with modals.
  }
}
