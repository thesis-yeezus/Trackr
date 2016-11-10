import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import signup component here

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
  private userUrl = 'http://localhost:8000/api/user/createUser';

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

  createUser(user: any) {
    console.log('The user', user)
    this.http.post(this.userUrl, JSON.stringify(user), {headers: this.headers})
      .subscribe((response) => {
        console.log(`The user has been added.`, response.json())
      })
  }

  // createUser(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   username: string,
  //   password: string,
  //   role: string
  //   ): Promise<User> {
  //     return this.http
  //       .post(this.userUrl, JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         username: username,
  //         password: password,
  //         role: role
  //       }), {headers: this.headers})
  //       .toPromise()
  //       .then(res => res.json().data)
  //       .catch(this.handleError);
  // }

  // getUser(id: number): Promise<User> {
  //   return this.http.get(this.userUrl)
  //         .toPromise()
  //         .then(response => response.json().data)
  //         .catch(this.handleError);
  // }

  // getUserList(): Promise<User[]> {
  //   return this.http.get(this.userUrl)
  //           .toPromise()
  //           .then(response => response.json().data as User[])
  //           .catch(this.handleError)
  // }

}
