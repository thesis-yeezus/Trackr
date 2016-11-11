import { Component, OnInit } from '@angular/core';
import { UserService }       from '../shared/user.service';
import { Router }            from '@angular/router';
import { AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  //JEFF - 11/11/16, Why the hell did I need to inject UserService as a provider here to get the login.component to work??!
  providers: [UserService, AuthenticationService]
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToSignupPage() {
    this.router.navigate(['/signup']);
  }

}
