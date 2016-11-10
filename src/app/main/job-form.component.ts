import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface JobPosting {
  companyName
  position: string;
  url: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  comments: string;
  date: string;
}

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})

export class JobFormComponent implements OnInit {
public jobPosting: JobPosting;
  
  ngOnInit() {
    this.jobPosting = {
      companyName: '',
      position: '',
      url: '',
      contactName: '',
      contactEmail: '',
      contactNumber: '',
      comments: '',
      date: ''
      }
    };
  
  save(model: JobPosting, isValid: boolean) {
    console.log(model, isValid);
  }
}