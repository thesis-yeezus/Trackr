import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { RouterModule }          from '@angular/router';
import { NgSemanticModule }      from 'ng-semantic';
import { ModalModule }           from 'ng2-modal';
import { AgGridModule }          from 'ag-grid-ng2/main';
import { AppRoutingModule }      from './app.routing.module';
import { ReactiveFormsModule }   from '@angular/forms';

// Add Component files in here AND in declarations
import { AppComponent }          from './app.component';
import { SignupComponent }       from './signup/signup.component';
import { MainComponent }         from './main/main.component';
import { LoginComponent }        from './shared/login.component';
import { SignoutComponent }      from './shared/signout.component';
import { SplashComponent }       from './splash/splash.component';
import { JobFormComponent }      from './main/job-form.component';
import { AuthGuard }             from './shared/auth.guards';
import { AuthenticationService } from './shared/authentication.service';
import { UserService }           from './shared/user.service';
import { LinkedinComponent }     from './linkedin/linkedin.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { JobPageComponent }      from './main/job-page.component';
import { SignupSettingsComponent } from './signup-settings/signup-settings.component';


// import {UserService} from './shared/user.service'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgSemanticModule,
    ModalModule,
    AppRoutingModule,
    AgGridModule.withNg2ComponentSupport(),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent,
    SplashComponent,
    JobFormComponent,
    LinkedinComponent,
    AccountSettingsComponent,
    LinkedinComponent,
    JobPageComponent,
    SignupSettingsComponent
  ],

  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
