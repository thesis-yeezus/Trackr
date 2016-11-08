import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../shared/user';

class JobList {
  id: number;
  position: string;
  url: string;
  contact: string;
  contactEmail: string;
  comments: string;
  interview: boolean;
  pursuing: boolean;
  date: string;
}

@Injectable()
export class JobListService {

  private jobListUrl = 'api/';

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

}
