import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';





import { SplashComponent }      from './splash/splash.component';
import { MainComponent }        from './main/main.component';
import { JobFormComponent }     from './main/job-form.component';
import { SignupComponent }      from './signup/signup.component';
import { AuthGuard }            from './shared/auth.guards';
import { AccountSettingsComponent }      from './account-settings/account-settings.component';
import { SignupSettingsComponent } from './signup-settings/signup-settings.component';
import { JobPageComponent }             from './main/job-page.component';
//TODO Add other routes

//import './rxjs-extensions';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-settings', component: SignupSettingsComponent },
  { path: 'main',  component: MainComponent, canActivate: [AuthGuard]},
  { path: 'main/:hash/:id',  component: JobPageComponent },
  { path: 'job-form', component: JobFormComponent, canActivate: [AuthGuard]},
  { path: 'account-settings', component: AccountSettingsComponent},

  //took out AuthGuard to make linkedin work
  
  //Add logout button to job-form and main
    // Not a redirect, but a void!
  //Add ,canActivate: [AuthGuard] on protected links
    //ie. main and job-form

  //JEFF - 11/11/16, "otherwise redirect to splash/home page"
  { path: '*', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
//JEFF - 11/11/16, I saw this example on jasonwatmore, 
  // do you guys think we should use this instead of 
  // 'export class AppRoutingModule {}'?
//export const routing = RouterModule.forRoot(appRoutes);
export class AppRoutingModule {}