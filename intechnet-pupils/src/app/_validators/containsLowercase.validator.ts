import { AbstractControl } from '@angular/forms';

/**
 * @summary Check if a value in the control has lowercase character
 * @param control provided control (a form)
 * @returns a JSON with the key containsDigit and value true
 */
export function ContainsLowercase(control: AbstractControl) {
  
    const value = control.value as string;

    const hasLowercase = value.match('[a-z]');


    if (!hasLowercase) {
        return { containsLowercase: true };
    }

    return null;
}
