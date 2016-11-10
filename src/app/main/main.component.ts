import { Component, OnInit } from '@angular/core';

import { GridOptions, IFilter } from 'ag-grid/main';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

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
  private rowData: any[] = this.dummyData;
  private columnDefs: any[];
  private rowCount: string;
  

  constructor() {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.getRowData();
    this.showGrid = true;
   }

  ngOnInit() {
    
  }

  private getRowData() {
    
  }

}
