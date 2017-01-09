import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: [`
   #inputLabel {
     color: white;
   }
   .ui.form input.error {
     border: red 1px solid;
   }
  `],
  providers: [UserService]
})
export class AccountSettingsComponent implements OnInit {

  accountSettings: FormGroup;
  changePW: FormGroup;

  user: any = {}
  userId: number = window.localStorage["userId"];
  username: string = window.localStorage["username"];
  firstName: string = window.localStorage["firstName"];
  lastName: string = window.localStorage["lastName"];
  email: string = window.localStorage["email"];
  goals = [
    {value: true, display: 'Yes'},
    {value: false, display: 'No'}
  ]
  setGoals: Number = window.localStorage["setGoals"];
  receiveEmail: Boolean = window.localStorage["receiveEmail"];
  receiveEmails = [
    {value: true, display: 'Yes'},
    {value: false, display: 'No'}
  ]
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.accountSettings = this.fb.group({
      'firstName': [this.firstName, Validators.required], 
      'lastName': [this.lastName, Validators.required], 
      'username': [this.username, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])], //min, max, unique 
      'email': [this.email, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      setGoals: [this.setGoals, Validators.required],
      receiveEmail: [this.receiveEmail, Validators.required]
    }),
    this.changePW = this.fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])]
    })
  }

  ngOnInit() {
    
  }

  updateUserSettings(settings: any) {
    var userId: any = window.localStorage["userId"];
    this.userService.updateUserSettings(settings, userId)
    var here = this;
      setTimeout(function(){
        here.router.navigate(['/main'])
      }, 1000)
  }

  changedPassword(password: any) {
    var userId: any = window.localStorage["userId"];
    this.userService.changedPassword(password, userId)
  }
  private redirectToMain() {
    this.router.navigate(['/main'])
  }

  private logout() {
    this.router.navigate(['/splash']);
    localStorage.clear();
  }
}
