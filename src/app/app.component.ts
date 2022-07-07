import { Component, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  log: string[] = [];
  formControl = new FormControl('', [
    (control) =>
      control.value.startsWith('err')
        ? { outerValidator: 'Error from outer validator' }
        : undefined,
    Validators.maxLength(10),
    Validators.required,
    (control) => {
      this.log = [...this.log, `validator triggered for "${control.value}" at ${new Date().toISOString()}`];
      return null;
    },
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
