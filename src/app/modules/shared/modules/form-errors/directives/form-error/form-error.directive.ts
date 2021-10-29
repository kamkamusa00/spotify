import {
  Directive,
  Self,
  AfterViewInit,
  HostListener,
  Optional,
  Host,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormSubmitGroupI } from '@shared/modules/form-errors/model/form-submit-group.model';
import { ErrorTextComponent } from '../../components/error-text/error-text.component';
import { VALIDATORS_ERROR_MESSAGES } from '../../consts/validation-error-messages';
import { ErrorAfterThis } from '../error-after-this/error-after-this.directive';

@UntilDestroy()
@Directive({
  selector: '[controlFormError]'
})
export class FormErrorDirective implements AfterViewInit {
  domErrorText = '';
  ref: ComponentRef<ErrorTextComponent>;
  errorPositionRef: ViewContainerRef;

  constructor(
    @Self() private control: NgControl,
    @Optional() @Host() private parent: ControlContainer, // needed for know if form is submitted
    @Optional() @Host() private errorAfterThis: ErrorAfterThis, // needed for know where push error
    private viewConRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
    this.errorPositionRef = this.errorAfterThis
      ? this.errorAfterThis.viewConRef
      : this.viewConRef;
  }

  @HostListener('focus') focus(): void {
    this.onFocus();
  }

  @HostListener('blur') blur(): void {
    this.onBlur();
  }

  ngAfterViewInit(): void {
    this.subscribeToControlChanges();
    this.subscribeToFormStatusChanges();
  }

  clear(): void {
    this.hideError();
  }

  private subscribeToControlChanges(): void {
    if (this.control?.valueChanges) {
      this.control.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe(() => this.onControlChange());
    }
  }

  private subscribeToFormStatusChanges(): void {
    this.parent.control.statusChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.onControlChange();
      });
  }

  private canShowError(): boolean {
    const formGroup = this.parent?.control as FormSubmitGroupI;
    return this.control.touched || formGroup?.submitted;
  }

  private hasErrors(): boolean {
    return (
      this.canShowError() &&
      !!this.control.errors &&
      Object.keys(this.control.errors).some(
        (key: string) => this.control.errors[key]
      )
    );
  }

  private showError(errorText: string): void {
    console.log(errorText);
    if (!this.ref) {
      const factory = this.cfr.resolveComponentFactory(ErrorTextComponent);
      this.ref = this.errorPositionRef.createComponent(factory);
    }
    this.ref.instance.text = errorText;
  }

  private hideError(): void {
    if (this.ref) {
      this.errorPositionRef.clear();
      this.ref = null;
    }
  }

  private onControlChange(): void {
    if (this.hasErrors()) {
      this.setError();
    } else if (this.ref?.instance?.text) {
      this.hideError();
    }
  }

  private setError(): void {
    const controlErrors = this.control?.errors;
    const errorKey = getLastErrorKey(controlErrors);
    const errorValue = this.control.errors[errorKey];
    const errorFn = VALIDATORS_ERROR_MESSAGES?.[errorKey];
    if (errorFn) {
      const errorText = errorFn(errorValue);
      this.showError(errorText);
    }
  }

  private onFocus(): void {
    this.onControlChange();
  }

  private onBlur(): void {
    this.onControlChange();
  }
}

function getLastErrorKey(errors: Record<string, unknown>): string {
  return Object.keys(errors)
    .filter((key: string) => errors[key])
    .slice(-1)[0];
}
