import { Component, OnInit } from '@angular/core';
import { JobPosting } from './job-posting.interface';
import { JobListService } from './job-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})

export class JobFormComponent implements OnInit {

  public jobPosting: JobPosting;

  constructor(
    private router: Router,
    private jobListService: JobListService
  ) { }
  
  ngOnInit() {
    this.jobPosting = {
      companyName: '',
      position: '',
      url: '',
      contactName: '',
      contactEmail: '',
      contactNumber: '',
      comments: '',
      date: 'yyyy-mm-dd',
      phoneScreen: '',
      interview: '',
      userId: parseInt(window.localStorage["userId"])
      }
    };

  back() {
    this.router.navigate(['/main']);
  }
  
  save(post: JobPosting, isValid: boolean) {
    console.log(post, isValid);
    post.userId = parseInt(window.localStorage["userId"]);
    this.jobListService.createJob(post);
    this.router.navigate(['/main']);
  }
}