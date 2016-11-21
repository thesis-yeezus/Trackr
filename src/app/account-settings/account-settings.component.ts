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
  
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.accountSettings = this.fb.group({
      'firstName': [this.firstName, Validators.required], 
      'lastName': [this.lastName, Validators.required], 
      'username': [this.username, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])], //min, max, unique 
      'email': [this.email, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])]
    }),
    this.changePW = this.fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])]
    })
  }

  ngOnInit() {
    
  }

// Make everything editable/updateable as prepoplated form inputs
 
// Ability to change pw
// Would you like to set a goal for how many applications you want to send out in a day or a week?
   // Radioboxes: [ ] Yes [x] No
   // If Yes, undisable the form for the goals 
     // Radioboxes for week or day and a form for number
  // If No, disable the goal form input, and set frequency and goals value to 0;
  // Email notifications? 

// save button at the bottom!!! 
  // on save, find by userId 


//Questions
//1. For settings, should it be a part of the User schema, or as a new schema?


// DON'T FORGET!!
  // After making a http.update call, make sure to repopulate the localStorage items when result/data is returned
  // Ask users for how often they would like to receive notifications (once a week, once a day, etc.)
  // Notify users of the settings in the signup form?

// NOT AS IMPORTANT RN
//make sure that login saves all the same shit to localStorage that signup does
//currently does, but if i add some more things to the schema, then update these

  private redirectToMain() {
    this.router.navigate(['/main'])
  }

  private logout() {
    this.router.navigate(['/splash']);
    localStorage.clear();
  }
}
