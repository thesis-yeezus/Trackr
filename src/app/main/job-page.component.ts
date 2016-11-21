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
        })
        .catch(err => console.log(err))
    })
  }
  private back() {
    this.router.navigate(['/main']);
  }

  private itemCompanyName() {
    console.log("I GO IN THERE", this.jobPageItems.companyName)
    this.jobPageItems.companyName = false
    console.log("FALSE?", this.jobPageItems.companyName)
  }
  private itemPosition() {
    this.jobPageItems.position = false
  }
  private itemUrl() {
    this.jobPageItems.url = false
  }
  private itemContactName() {
    this.jobPageItems.contactName = false
  }
  private itemContactEmail() {
    this.jobPageItems.contactEmail = false
  }
  private itemContactNumber() {
    this.jobPageItems.contactNumber = false
  }
  private itemComments() {
    this.jobPageItems.comments = false
  }
  private itemDate() {
    this.jobPageItems.date = false
  }
  private itemPhoneScreen() {
    this.jobPageItems.phoneScreen = false
  }
  private itemInterview() {
    this.jobPageItems.interview = false
  }
  private save(post: any, isValid: boolean) {
    console.log(post, isValid);
    post.id = this.jobData.id;
    this.joblistService.editJobs(post).then(updatedList => {

      })
    this.router.navigate(['/main']);
  }

}
