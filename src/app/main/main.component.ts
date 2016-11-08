import { Component, OnInit } from '@angular/core';

import { GridOptions, IFilter } from 'ag-grid/main';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  private gridOptions: GridOptions;
  private showGrid: boolean;
  private rowData: any[];
  private columnDefs: any[];
  private rowCount: string;

  constructor() {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.showGrid = true;
   }

  ngOnInit() {
    
  }

  private createRowData() {
    var rowData: any[] = [];
  }

}
