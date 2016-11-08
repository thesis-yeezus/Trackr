import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private userUrl = '';

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: string
    ): Promise<User> {
      return this.http
        .post(this.userUrl, JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
          role: role
        }), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    return this.http.get(this.userUrl)
          .toPromise()
          .then(response => response.json().data)
          .catch(this.handleError);
  }

  getUserList(): Promise<User[]> {
    return this.http.get(this.userUrl)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError)
  }

}
