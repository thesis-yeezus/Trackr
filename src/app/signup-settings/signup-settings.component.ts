import { Component, OnInit } from '@angular/core';
import { UserService }                                                      from '../shared/user.service';
import { Router }                                                           from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule, FormControl }  from '@angular/forms';

@Component({
  selector: 'signup-settings',
  templateUrl: './signup-settings.component.html',
  styleUrls: ['./signup-settings.component.css'],
  providers: [UserService]
})
export class SignupSettingsComponent implements OnInit {

  signupSettingsForm: FormGroup;
  goals = [
    {value: true, display: 'Yes'},
    {value: false, display: 'No'}
  ]
  setGoals: Number;
  receiveEmails = [
    {value: true, display: 'Yes'},
    {value: false, display: 'No'}
  ]

  ngOnInit() {
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) {
      // this.signupForm = this.fb.group({
      //   'firstName': [null, Validators.required], 
      //   'lastName': [null, Validators.required], 
      //   'username': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])], //min, max, unique
      //   'password': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])],
      //   'confirmPassword': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])], 
      //   'email': [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])] //must be an email address
      // })
      this.signupSettingsForm = this.fb.group({
        // 'goals': "",
        'setGoals': null, //a number
        'receiveEmails': null // true or false
      })
    }



  applySignupSettings(settings: any) {
    console.log('This is settings:', settings);
    var userId: any = window.localStorage["userId"];
    //set information to localStorage
    // After sending this information to SAVE, redirect to the Main Page
    this.userService.applySignupSettings(settings, userId)
    var here = this;
      setTimeout(function(){
        here.router.navigate(['/main'])
      }, 1000)
}

  redirectToMainPage() {
    this.router.navigate(['/main']);
  }

}
