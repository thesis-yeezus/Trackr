import { Injectable } from '@angular/core';

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

  constructor() { }

}
