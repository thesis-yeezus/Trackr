import { Component } from '@angular/core';
import { LoginService } from './shared/login.service';
import { JobListService } from './main/job-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService, JobListService]
})
export class AppComponent {
  title = 'app works!';
}
