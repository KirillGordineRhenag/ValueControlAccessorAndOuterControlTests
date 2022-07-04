import { Component, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  formControl = new FormControl('', [
    (control) =>
      control.value.startsWith('err')
        ? { outerValidator: 'Error from outer validator' }
        : undefined,
    Validators.maxLength(10),
    Validators.required,
  ]);

  public addErrorToControl() {
    this.formControl.setErrors({
      ...this.formControl.errors,
      manualSetError: 'Manual set error',
    });
  }
  public removeErrorFromControl() {
    const errors = this.formControl.errors;
    delete errors['manualSetError'];
    this.formControl.setErrors(errors);
  }
}
