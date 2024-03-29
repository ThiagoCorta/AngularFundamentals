import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[ValidateLocation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LocationValidatorDirective,
      multi: true
    }
  ]
})
export class LocationValidatorDirective implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    const address = formGroup.controls.address;
    const city = formGroup.controls.city;
    const country = formGroup.controls.country;
    const onlineUrl = (formGroup.root as FormGroup).controls.onlineUrl;

    if (
      (address &&
        address.value &&
        city &&
        city.value &&
        country &&
        country.value) ||
      (onlineUrl && onlineUrl.value)
    ) {
      return null;
    } else { return { validateLocation: false }; }
  }
}
