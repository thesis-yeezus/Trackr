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
      this.signupSettingsForm = this.fb.group({
        'setGoals': null, //a number
        'receiveEmails': null // true or false
      })
    }



  applySignupSettings(settings: any) {
    console.log('This is settings:', settings);
    var userId: any = window.localStorage["userId"];
    // set information to localStorage
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
