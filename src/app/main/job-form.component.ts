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
      date: 'mm/dd/yyyy',
      userId: parseInt(window.localStorage["userId"])
      }
    };
  
  save(post: JobPosting, isValid: boolean) {
    console.log(post, isValid);
    post.userId = parseInt(window.localStorage["userId"]);
    post.date = null;
    this.jobListService.createJob(post);
    this.router.navigate(['/main']);
  }
}