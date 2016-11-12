import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { GridOptions, IFilter } from 'ag-grid/main';

import { JobListService } from './job-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterContentInit {

  private convert() {
    return 'testingConvert!'
  }

  private dummyData: any[] = [
  {
    id: 1,
    companyName: 'Google',
    position: 'Front End dev',
    url: 'google.com',
    contactName: 'John Doe',
    contactEmail: 'john@google.com',
    contactNumber: '123-123-1234',
    comments: 'Great!',
    interview: true,
    pursuing: true,
    date: 'January 1st'
    
  },
  {
    id: 2,
    companyName: 'Apple',
    position: 'Back End dev',
    url: 'apple.com',
    contactName: 'Jane Doe',
    contactEmail: 'jane@apple.com',
    contactNumber: '123-123-2334',
    comments: 'Great!!!!!!!!!!!!!!',
    interview: true,
    pursuing: true,
    date: this.convert()
  }
]

  private gridOptions: GridOptions;
  private showGrid: boolean;
  private rowData: any[];
  private columnDefs: any[];
  private rowCount: string;
  

  constructor(
    private router: Router,
    private joblistService: JobListService
  ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    //this.getRowData();
    this.showGrid = true;
   }

  ngOnInit() {
    // make a get request for all jobs
    this.getRowData(window.localStorage["username"]);
  }

  ngAfterContentInit() {
    var self = this;
    setTimeout(function(){
      self.getRowData(window.localStorage["username"]);
    },500)

   const splitCookie = document.cookie.split(';')
   splitCookie.forEach(cookie => {
     if (cookie.indexOf('userId') !== -1) {
       localStorage.userId = cookie.slice(8);
     } else if (cookie.indexOf('username') !== -1) {
       localStorage.username = cookie.slice(10);
     }
   })
    
  }

  private getRowData(user: string) {
    this.joblistService.getJobList(user).then(jobList => {
      this.rowData = jobList;
      console.log(this.rowData)
    })
  }

  private redirectToJob() {
    this.router.navigate(['/job-form'])
  }

}
