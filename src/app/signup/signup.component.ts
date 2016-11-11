import { Component, OnInit } from '@angular/core';
import { LoginService }      from '../shared/login.service';
import { UserService }       from '../shared/user.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  user: Object = {};

  ngOnInit() {
  }
  
  createUser(formObj) {
    
    console.log('dis is the user:', formObj);
    window.localStorage.username = formObj.username;
    console.log('this is window.localStorage:', window.localStorage);
    //call a method inside the user.service
    //after it successes, say success
    this.userService.createUser(formObj);
    this.router.navigate(['/main']);
      // .subscribe
    // formObj = {};
  }
}

// post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;