import { Component, OnInit } from '@angular/core';
import { UserService }       from './user.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <button class="right attached ui button" (click)="loginModal.show({inverted:false})">Login</button>
    <sm-modal title="Login" class="basic" #loginModal>
        <modal-content>
          <form class="ui form" name="login" #f="ngForm" (ngSubmit)="loginUser(f.value)">
            <div class="field">
              <label id="inputLabel">Username</label>
              <input type="text" placeholder="Username" name="username" ngModel>
            </div>
            <div class="field">
              <label id="inputLabel">Password</label>
              <input type="password" placeholder="Password" name="password" ngModel>
            </div>
            <button class="ui button" type="submit" (click)="loginModal.hide()">Submit</button>
          </form>
        </modal-content>
    </sm-modal>
    `,
  styles: [`
   #inputLabel {
     color: white;
   } 
    `]
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  // loginUser(formObj){
  //   console.log('This is the formObj:', formObj)
  //   //call userservice method here to login
  //   this.userService.loginUser(formObj.username, formObj.password)
  //   .subscribe(result => {
  //     if (result === true) {
  //       // Then redirect to the main page
  //       this.router.navigate(['/main'])
  //     } else {
  //       // Some error message
  //     }
  //   }) 
  // }

}
