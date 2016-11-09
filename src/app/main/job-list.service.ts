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

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createJob(
    position: string,
    url: string,
    contact: string,
    contactEmail: string,
    comments: string,
    interview: boolean,
    pursuing: boolean,
    date: string
    ): Promise<Job> {
      return this.http
        .post(this.jobListUrl, JSON.stringify({
          position: position,
          url: url,
          contact: contact,
          contactEmail: contactEmail,
          comments: comments,
          interview: interview,
          pursuing: pursuing,
          date: date
        }), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  getJob(id: number): Promise<Job> {
    return this.http.get(this.jobListUrl)
          .toPromise()
          .then(response => response.json().data)
          .catch(this.handleError);
  }

  getJobList(): Promise<Job[]> {
    return this.http.get(this.jobListUrl)
            .toPromise()
            .then(response => response.json().data as Job[])
            .catch(this.handleError)
  }

}
