import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class User {
  // id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  // role: string;
}

@Injectable()
export class UserService {
  public token: string;
  //Resolve HTTP using the constructor
  constructor(private http: Http) { 
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  private createUserUrl = '/api/user/createUser';
  private loginUserUrl = '/api/user/loginUser';
  private applySignupSettingsUrl = '/api/user/applySignupSettings';
  private updateUserSettingsUrl = '/api/user/updateUserSettings';
  private changedPasswordUrl = '/api/user/changedPassword'

  createUser(user: any) {
    this.http.post(this.createUserUrl, JSON.stringify(user), {headers: this.headers})
      .subscribe((response) => {
        console.log(`Made it back to user.service.ts and the user has been added:`, response.json())
        window.localStorage["userId"] = response.json().id;
        window.localStorage["firstName"] = response.json().firstName;
      })
  }

  
  loginUser(username, password): Observable<boolean> {
    
    return this.http
               .post(this.loginUserUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
               .map((response: Response) => {
      
                 let res = response.json();
                 console.log(res);
                 if(res) {
                   window.localStorage["userId"] = res.id;
                   window.localStorage["username"] = res.username;
                   window.localStorage["firstName"] = res.firstName;
                   window.localStorage["lastName"] = res.lastName;
                   window.localStorage["email"] = res.email;
                   return true;
                 } else {
                   return false
                 }
               })
  }

  applySignupSettings(settings: any, userId: any) {
    this.http
        .put(this.applySignupSettingsUrl, JSON.stringify({settings: settings, userId: userId}), {headers: this.headers})
        .subscribe((response) => {
          window.localStorage["receiveEmail"] = response.json().receiveEmails
          window.localStorage["frequency"] = response.json().frequency
          window.localStorage["setGoals"] = response.json().goals
        })
  }

  updateUserSettings(settings: any, userId: any) {
    this.http
        .put(this.updateUserSettingsUrl, JSON.stringify({settings: settings, userId: userId}), {headers: this.headers})
        .subscribe((response) => {
          let res = response.json();
          window.localStorage["userId"] = res.id;
          window.localStorage["username"] = res.username;
          window.localStorage["firstName"] = res.firstName;
          window.localStorage["lastName"] = res.lastName;
          window.localStorage["email"] = res.email;
          window.localStorage["receiveEmail"] = res.receiveEmails
          window.localStorage["frequency"] = res.frequency
          window.localStorage["setGoals"] = res.goals
        })
  }

  changedPassword(password: any, userId: any) {
    this.http
        .put(this.changedPasswordUrl, JSON.stringify({password: password, userId: userId}), {headers: this.headers})
        .subscribe((response) => {
          console.log('Password Changed:', response)
        })
  }
}
