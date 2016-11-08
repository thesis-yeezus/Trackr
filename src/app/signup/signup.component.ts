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
    // let loginService = new LoginService;
  }
  // test(){
  //   alert('sup')
  // }
  test(){
    this.loginService.modal();
  }

}
