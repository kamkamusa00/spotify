import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
  constructor() {
    console.log('constructor testService');
  }
  load() {
    console.log('hola ejecutada');
  }
}
