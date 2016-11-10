import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent }        from './main/main.component';
import { JobFormComponent }        from './main/job-form.component';
//TODO Add other routes

import './rxjs-extensions';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'main/:userName',  component: MainComponent },
  { path: 'job-form/:userName', component: JobFormComponent }
  //TODO Add other routes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}