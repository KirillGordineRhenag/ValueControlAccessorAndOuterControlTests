import {
  Component,
  Inject,
  OnInit,
  Optional,
  Self,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-my-control-with-error-messages',
  templateUrl: './my-control-with-error-messages.component.html',
  styleUrls: ['./my-control-with-error-messages.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => MyControlWithErrorMessagesComponent),
  //     multi: true,
  //   },
  // ],
})
export class MyControlWithErrorMessagesComponent
  implements OnInit, ControlValueAccessor
{
  public value;
  public formControl = new FormControl();

  private onChange: (string) => void;
  private onTouched: () => void;

  constructor(
    @Optional()
    @Self()
    private readonly controlDirective: NgControl
  ) {
    this.controlDirective.valueAccessor = this;
  }

  ngOnInit() {
    this.controlDirective.control.addValidators((control) =>
      control.value === 'error' ? { customError: 'Oopsie' } : undefined
    );
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
