import { Component } from '@angular/core';
import { JobListService } from './main/job-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JobListService]
})
export class AppComponent {
  title = 'Trackr!';
}
