import { CommonModule } from '@angular/common';
import { Provider } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorDirective } from './directives/form-error/form-error.directive';

const publicElements : Provider[] = [FormErrorDirective];

@NgModule({
  declarations: [
    ...publicElements,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    ...publicElements
  ],

})
export class SharedModule { }
