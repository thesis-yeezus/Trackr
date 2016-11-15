import { Component, 
         OnInit }      from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router }      from '@angular/router';
import { FormBuilder, 
         FormGroup,
         NgForm, 
         Validators,
         ReactiveFormsModule }  from '@angular/forms';

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
        'username': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(12)])], //min, max, unique
        'password': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])],
        'confirmPassword': [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$")])], 
        'email': [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])] //must be an email address
      })
    }

  ngOnInit() {
  }

  createUser(value: any) {
    console.log('dis is the user:', value);
    // window.localStorage["username"] = value.username;
    // console.log('this is window.localStorage:', window.localStorage);
    //call a method inside the user.service
    //after it successes, say success
    // this.userService.createUser(value);
    // this.router.navigate(['/main'])
    // var here = this;
    // setTimeout(function(){
    //   here.router.navigate(['/main'])
    // }, 1000)
      // .subscribe
    // value = {};
  }


  redirectToHomePage() {
    // this.router.navigate(['/splash']);
  }
}

// post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;