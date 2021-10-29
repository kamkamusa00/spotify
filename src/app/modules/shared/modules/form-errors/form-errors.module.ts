import { NgModule } from '@angular/core';
import { ErrorTextComponent } from './components/error-text/error-text.component';
import { ErrorAfterThis } from './directives/error-after-this/error-after-this.directive';
import { FormErrorDirective } from './directives/form-error/form-error.directive';

@NgModule({
  declarations: [FormErrorDirective, ErrorTextComponent, ErrorAfterThis],
  exports: [FormErrorDirective, ErrorTextComponent, ErrorAfterThis]
})
export class FormErrorsModule {}
