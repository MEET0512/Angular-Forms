import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator, existUserName } from './shared/user-name.validator';
import { passwordValidator } from './shared/password.validato';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder,private _registrationService: RegistrationService) {}

  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/), existUserName]],
      email: [''],
      subscibe: [false],
      password: ['',[Validators.required, Validators.minLength(6), forbiddenNameValidator(/password/)]],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    },{validator: passwordValidator});

    this.registrationForm.get('subscibe').valueChanges
          .subscribe(checkedValue => {
              const email = this.registrationForm.get('email');
              if(checkedValue) {
                email.setValidators(Validators.required);
              } else {
                email.clearValidators();
              }
              email.updateValueAndValidity();
          });
  }

  alternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  onSubmit() {
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
  }

 /*registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
 });*/

 loadApiData() {
   //Must set the all values when use serValue method to set the value
  this.registrationForm.setValue ({
    userName: 'Meet Patel',
    password: 'Meetu@0512',
    confirmPassword: 'Meetu@0512',
    address: {
      city: 'Vadodara',
      state: 'Gujarat',
      postalCode: '390023'
    }
  });

  //To set only necessary value use patchValue methos 
  /*this.registrationForm.patchValue ({
    userName: 'Meet Patel',
    password: 'Meetu@0512',
    confirmPassword: 'Meetu@0512'
  });*/
 }

}
