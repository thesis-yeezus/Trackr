import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <button class="right attached ui button" (click)="loginModal.show({inverted:false})">Login</button>
    <sm-modal title="Login" class="basic" #loginModal>
        <modal-content>
          <form class="ui form" (click)="test()">
            <div class="field">
              <label id="inputLabel">Username</label>
              <input type="text" placeholder="Username">
            </div>
            <div class="field">
              <label id="inputLabel">Password</label>
              <input type="password" placeholder="Password">
            </div>
            <button class="ui button" type="submit">Submit</button>
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

  constructor() { }

  ngOnInit() {
  }

}
