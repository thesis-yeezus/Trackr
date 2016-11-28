import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { JobPosting } from './job-posting.interface';
import { JobListService } from './job-list.service';
import * as moment from 'moment';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private joblistService: JobListService
  ) { }
  private currentId: number;
  private jobData: any;
  private jobPageItems: any;
  private showSubmit: boolean;
  private url: string;

  ngOnInit() {
    this.jobPageItems = {};
    this.jobPageItems.companyName = true;
    this.jobPageItems.position = true;
    this.jobPageItems.url = true;
    this.jobPageItems.contactName = true;
    this.jobPageItems.contactEmail = true;
    this.jobPageItems.contactNumber = true;
    this.jobPageItems.comments = true;
    this.jobPageItems.date = true;
    this.jobPageItems.phoneScreen = true;
    this.jobPageItems.interview = true;
    this.url = "http://www.linkedin.com/shareArticle?url=" + window.location.href
    
    console.log("This is window", window.location.href)
    console.log(this.url)
    console.log("Do we have the job id?", this.route.params) 
    this.route.params.forEach((params: Params) => {
      console.log("inforeach params", params)
      this.currentId = parseInt(params['id'])
      console.log('this is currentId', this.currentId)
      this.joblistService.getJob(this.currentId)
        .then(data => {
          this.jobData = data
          var day:any = moment(data.date);
          console.log("this is day", day)
          var today:any = moment().startOf('day');
          if(data.date === null) {
            data["remaining"] = "Invalid Date"
          } else if(Math.round((today - day) / 86400000) === 1) { 
            data["remaining"] = "1 day ago"
          } else {
            data["remaining"] = Math.round((today - day) / 86400000) + " days ago"
          }
          if(parseInt(localStorage["userId"]) === this.jobData.userId) {
            this.showSubmit = true;
          } else {  
            this.showSubmit = false;
          }
        })
        .catch(err => console.log(err))
    })
  }
  private back() {
    this.router.navigate(['/main']);
  }

  private itemCompanyName() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.companyName = false
    }
  }
  private itemPosition() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.position = false
    }
  }
  private itemUrl() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.url = false
    }
  }
  private itemContactName() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.contactName = false
    }
  }
  private itemContactEmail() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.contactEmail = false
    }
  }
  private itemContactNumber() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.contactNumber = false
    }
  }
  private itemComments() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.comments = false
    }
  }
  private itemDate() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.date = false
    }
  }
  private itemPhoneScreen() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.phoneScreen = false
    }
  }
  private itemInterview() {
    if(parseInt(localStorage["userId"]) === this.jobData.userId) {
      this.jobPageItems.interview = false
    }
  }
  private save(post: any, isValid: boolean) {
    console.log(post, isValid);
    post.id = this.jobData.id;
    this.joblistService.editJobs(post).then(updatedList => {

      })
    this.router.navigate(['/main']);
  }
  private popUp() {
    window.open(this.url,'popupwindow','scrollbars=yes,width=800,height=400').focus();
    return false;
  }

}
