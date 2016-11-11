import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent }        from './main/main.component';
import { JobFormComponent }     from './main/job-form.component';
import { SignupComponent }      from './signup/signup.component';
//TODO Add other routes

//import './rxjs-extensions';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'main',  component: MainComponent },
  { path: 'job-form', component: JobFormComponent }
  //TODO Add other routes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}