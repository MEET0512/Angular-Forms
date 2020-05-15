import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if(password.pristine || confirmPassword.pristine) {
        return null;
    }

    return password && confirmPassword && password.value != confirmPassword.value? {'mismatch': true} : null;
}