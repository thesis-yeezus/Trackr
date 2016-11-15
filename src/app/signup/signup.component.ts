import { Component, OnInit }                                                from '@angular/core';
import { UserService }                                                      from '../shared/user.service';
import { Router }                                                           from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule }  from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
    .ui.form input.error {
      border: red 1px solid;
    }
  `],
  providers: [UserService]
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.signupForm = this.fb.group({
        'firstName': [null, Validators.required], 
        'lastName': [null, Validators.required], 
        'username': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])], //min, max, unique
        'password': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])],
        'confirmPassword': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])], 
        'email': [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])] //must be an email address
      })
    }

  ngOnInit() {
  }

  createUser(user: any) {
    window.localStorage["username"] = user.username;
    console.log('dis is the user:', user);
    console.log('this is window.localStorage:', window.localStorage);
    this.userService.createUser(user);
    
    var here = this;
    setTimeout(function(){
      here.router.navigate(['/main'])
    }, 1000)
  }

  redirectToHomePage() {
    this.router.navigate(['/splash']);
  }
}