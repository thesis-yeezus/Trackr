import { Component, OnInit } from '@angular/core';

import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  
  submitForm() {
    // this.model = new Signup(firstName);
  }
// , lastName, username, password, email
}
