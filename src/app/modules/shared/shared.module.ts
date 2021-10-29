import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from './modules/form-errors/form-errors.module';

@NgModule({
  exports: [ReactiveFormsModule, CommonModule, FormErrorsModule]
})
export class SharedModule {}
