import {
  Component,
  Inject,
  OnInit,
  Optional,
  Self,
  forwardRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-my-control-with-error-messages',
  templateUrl: './my-control-with-error-messages.component.html',
  styleUrls: ['./my-control-with-error-messages.component.css'],
})
export class MyControlWithErrorMessagesComponent
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  public value;
  private innerFormControl = new FormControl();

  public formControl = this.innerFormControl;
  public outerControl?: AbstractControl;

  public forwardValidatorCalls = false;
  private _useOuterFormControl = false;
  public set useOuterFormControl(value: boolean) {
    this._useOuterFormControl = value;
    this.formControl = this.useOuterFormControl
      ? (this.outerControl as FormControl)
      : this.innerFormControl;
  }

  public get useOuterFormControl() {
    return this._useOuterFormControl;
  }

  private onChange: (string) => void;
  private onTouched: () => void;

  @Input() public label = '';

  constructor(
    @Optional()
    @Self()
    private readonly controlDirective: NgControl
  ) {
    this.controlDirective.valueAccessor = this;
  }

  ngOnInit() {
    this.outerControl = this.controlDirective.control;
    this.controlDirective.control.addValidators([
      Validators.minLength(2),
      (control) =>
        control.value.startsWith('error')
          ? { innerValidator: 'Error from inner validator' }
          : undefined,
    ]);

    // don't want to do this!
    this.formControl.addValidators((control) =>
      this.forwardValidatorCalls ? this.outerControl.validator?.(control) : null
    );
  }

  ngAfterViewInit() {
    // here we could do the assignment
    // this.formControl = this.controlDirective.control;
    // if it is an acceptable decision
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  public onInputChange($event: Event) {
    this.onChange?.(($event.target as HTMLInputElement).value);
  }

  public onInputBlur() {
    this.onTouched?.();
  }
}
