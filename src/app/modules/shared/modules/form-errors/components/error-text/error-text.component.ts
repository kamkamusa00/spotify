import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-text',
  templateUrl: './error-text.component.html'
})
export class ErrorTextComponent {
  @Input() text: string;
}
