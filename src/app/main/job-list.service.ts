import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserService } from '../shared/user.service';


class Job {
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
  jobList: Job[];

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
