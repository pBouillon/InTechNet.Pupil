import { AbstractControl } from '@angular/forms';


/**
 * @summary Check if a value in the control has digit
 * @param control provided control (a form)
 * @returns a JSON with the key containsDigit and value true
 */
export function ContainsDigit(control: AbstractControl) {
  
    const value = control.value as string;

    const hasDigit = value.match('[0-9]');

    if (!hasDigit) {
        return { containsDigit: true };
    }

    return null;
}
