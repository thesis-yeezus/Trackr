import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { JobListService } from './job-list.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private joblistService: JobListService
  ) { }
  private currentId: number;
  private jobData: any;

  ngOnInit() {
    console.log("Do we have the job id?", this.route.params) 
    this.route.params.forEach((params: Params) => {
      console.log("inforeach params", params)
      this.currentId = parseInt(params['id'])
      console.log('this is currentId', this.currentId)
      this.joblistService.getJob(this.currentId)
        .then(data => this.jobData = data)
        .catch(err => console.log(err))
    })
  }
  

}
