import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { ModalModule }      from 'ng2-modal';
import { AgGridModule }     from 'ag-grid-ng2/main';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }     from './app.component';
import { SignupComponent }  from './signup/signup.component';
import { MainComponent }    from './main/main.component';
import { LoginComponent }   from './shared/login.component';
import { SignoutComponent } from './shared/signout.component';
import { SplashComponent }  from './splash/splash.component';
import { JobFormComponent } from './main/job-form.component';
import { LinkedinComponent } from './linkedin/linkedin.component';

// import {UserService} from './shared/user.service'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    NgSemanticModule,
    ModalModule,
    AppRoutingModule,
    AgGridModule.withNg2ComponentSupport()
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent,
    SplashComponent,
    JobFormComponent,
    LinkedinComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
