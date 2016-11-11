import { Component, OnInit } from '@angular/core';
import { UserService }       from '../shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: Object = {};

  ngOnInit() {
  }
  
  createUser(formObj) {
    
    console.log('dis is the user:', formObj);
    localStorage.username = formObj.username;
    console.log('this is window.localStorage:', window.localStorage);
    //call a method inside the user.service
    //after it successes, say success
    this.userService.createUser(formObj) 
    
      // .subscribe
    // formObj = {};
  }
}

// post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;