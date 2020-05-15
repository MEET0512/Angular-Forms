import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden? { 'forbiddenName': {value: control.value}} : null;
    }
}

export function existUserName(control: AbstractControl): {[key:string]: any} | null {
    let usernames = ['Meet', 'Meet Patel', 'Akshit', 'Akshit Shah'];
    let exist = false;
    usernames.forEach(username => {
        if(username === control.value) {
            exist = true;
        }
    });
    return exist? { 'existName': {value: control.value}} : null ;
}