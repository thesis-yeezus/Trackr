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
  //Resolve HTTP using the constructor
  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private createUserUrl = 'http://localhost:8000/api/user/createUser';
  private loginUserUrl = 'http://localhost:8000/api/user/loginUser';
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

  createUser(user: any) {
    console.log('The user', user)
    this.http.post(this.createUserUrl, JSON.stringify(user), {headers: this.headers})
      .subscribe((response) => {
        console.log(`The user has been added.`, response.json())
        window.localStorage.userId = response.json().id;
      })
  }

  // getUser(id: number): Promise<User> {
  //   return this.http.get(this.userUrl)
  //         .toPromise()
  //         .then(response => response.json().data)
  //         // .catch(this.handleError);
  // }

  loginUser(username: string, password:string): Observable<boolean> {
    //Pseudocode:
    // if the username and password match
    //   update local storage
    //   redirect to the mainpage
    console.log('are we making it here?:',username, password)
    // JEFF//ABOVE CONSOLE WORKS, SO DATA IS GETTING HERE
    return this.http
               .post(this.loginUserUrl, JSON.stringify({username, password}))
               .map((response: Response) => {
                 console.log('this is the response:', response)
                 let res = response.json();
                 console.log(res);
                 if(res) {
                   window.localStorage.userId = res.userId;
                   window.localStorage.username = res.userName;
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
