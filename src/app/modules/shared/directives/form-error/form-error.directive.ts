import {
  Directive,
  Self,
  AfterViewInit,
  HostListener,
  Optional,
  Host,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { VALIDATORS_ERROR_MESSAGES } from '@shared/consts/validation-error-messages';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormSubmitGroupI } from '@shared/model/form-submit-group.model';

@UntilDestroy()
@Directive({
  selector: '[controlFormError]'
})
export class FormErrorDirective implements AfterViewInit {
  errorText = '';
  domErrorText = '';
  errorContainer: HTMLElement;

  constructor(
    @Self() private control: NgControl,
    @Optional() @Host() private parent: ControlContainer, // needed for know if form is submitted
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

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

  private showError(): void {
    if (this.isSameError()) {
      return;
    }
    this.hideError();
    const fieldContainer = this.elementRef.nativeElement.closest('.field');
    this.errorContainer = document.createElement('div');
    this.errorContainer.classList.add('alert', 'alert-danger', 'p-1', 'fs-7');
    const textNode = document.createTextNode(this.errorText);
    this.errorContainer.appendChild(textNode);
    this.renderer2.appendChild(fieldContainer, this.errorContainer);
    this.domErrorText = this.errorText;
  }

  private hideError(): void {
    if (this.domErrorText) {
      const fieldContainer = this.elementRef.nativeElement.closest('.field');
      this.renderer2.removeChild(fieldContainer, this.errorContainer);
      this.domErrorText = '';
    }
  }

  private isSameError(): boolean {
    return this.domErrorText === this.errorText;
  }

  private onControlChange(): void {
    if (this.hasErrors()) {
      this.setError();
      this.showError();
    } else if (this.domErrorText) {
      this.errorText = '';
      this.hideError();
    }
  }

  private setError(): void {
    const controlErrors = this.control?.errors;
    const errorKey = getLastErrorKey(controlErrors);
    const errorValue = this.control.errors[errorKey];
    const errorFn = VALIDATORS_ERROR_MESSAGES?.[errorKey];
    if (errorFn) {
      this.errorText = errorFn(errorValue);
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
