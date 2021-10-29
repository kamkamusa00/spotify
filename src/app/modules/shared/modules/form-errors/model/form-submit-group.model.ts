import { FormGroup } from "@angular/forms";

export interface FormSubmitGroupI extends FormGroup{
  submitted?:boolean;
}
