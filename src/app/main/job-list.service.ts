import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserService } from '../shared/user.service';
import { JobPosting } from './job-posting.interface';


@Injectable()
export class JobListService {

  private jobListUrl = 'http://localhost:8000/api/';

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createJob(posting: JobPosting
    ): Promise<JobPosting> {
      console.log(posting,"This is posting")
      return this.http
        .post(this.jobListUrl + 'job-opening', JSON.stringify(
          posting
        ), {headers: this.headers})
        .toPromise()
        .then(res => console.log("SUCCESS!",res.json()))
        .catch(this.handleError);
  }

  getJob(id: number): Promise<any> {
    console.log("making getJob request")
    return this.http.get(this.jobListUrl + "job-opening/id/?jobId=" + id)
          .toPromise()
          .then(response => {
            console.log("getjob Response:", response.json())
            return response.json()
          })
          .catch(this.handleError);
  }

  getJobList(user: string): Promise<any[]> {
    return this.http.get(this.jobListUrl + "job-opening?username=" + user) // get username somehow!? JEFF@
            .toPromise()
            .then(response => response.json() as any[])
            .catch(this.handleError)
  }

  editJobs(job: any): Promise<any[]> {
    return this.http.put(this.jobListUrl + 'job-opening', job, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  deleteJob(jobId: number): Promise<any> {
    return this.http.delete(this.jobListUrl + "job-opening?jobId=" + jobId, {headers: this.headers})
      .toPromise()
      .then(response => console.log(".then in delete.job", response))
      .catch(this.handleError)
  }

}
