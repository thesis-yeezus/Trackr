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
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

  createUser(user: any) {
    console.log('The user', user)
    this.http.post(this.createUserUrl, JSON.stringify(user), {headers: this.headers})
      .subscribe((response) => {
        console.log('made it back to user.service.ts')
        console.log(`The user has been added.`, response.json())
        window.localStorage["userId"] = response.json().id;
      })
  }

  // getUser(id: number): Promise<User> {
  //   return this.http.get(this.userUrl)
  //         .toPromise()
  //         .then(response => response.json().data)
  //         // .catch(this.handleError);
  // }

  //MIGHT BE ABLE TO DELETE THIS BELOW!!
  loginUser(username, password): Observable<boolean> {
    console.log('are we making it here?:',username, password)
    // JEFF//ABOVE CONSOLE WORKS, SO DATA IS GETTING HERE
    return this.http
               .post(this.loginUserUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
               .map((response: Response) => {
                 console.log('this is the response:', response)
                 console.log('this is the response.json:', response.json())
                 let res = response.json();
                 console.log(res);
                 if(res) {
                   window.localStorage["userId"] = res.id;
                   window.localStorage["username"] = res.username;
                   return true;
                 } else {
                   return false
                 }
               })
  }
  

  // getUserList(): Promise<User[]> {
  //   return this.http.get(this.userUrl)
  //           .toPromise()
  //           .then(response => response.json().data as User[])
  //           .catch(this.handleError)
  // }

}
