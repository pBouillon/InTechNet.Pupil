import { AbstractControl } from '@angular/forms';

/**
 * @summary Check if a value in the control has uppercase character
 * @param control provided control (a form)
 * @returns a JSON with the key containsDigit and value true
 */
export function ContainsUppercase(control: AbstractControl) {
  
    const value = control.value as string;

    const hasUppercase = value.match('[A-Z]');

    if (!hasUppercase) {
        return { containsUppercase: true };
    }

    return null;
}
