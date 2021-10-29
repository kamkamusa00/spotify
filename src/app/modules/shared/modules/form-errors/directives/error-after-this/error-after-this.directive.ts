import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[errorAfterThis]'
})
export class ErrorAfterThis {
  constructor(public viewConRef: ViewContainerRef) {}
}
