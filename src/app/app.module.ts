import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { ModalModule } from 'ng2-modal';
import { AgGridModule } from 'ag-grid-ng2/main';

import { AppComponent }     from './app.component';
import { SignupComponent }  from './signup/signup.component';
import { MainComponent }    from './main/main.component';
import { LoginComponent }   from './shared/login.component';
import { SignoutComponent } from './shared/signout.component';
import { SplashComponent }  from './splash/splash.component';
import { JobFormComponent } from './main/job-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    NgSemanticModule,
    ModalModule,
    AgGridModule.withNg2ComponentSupport()
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent,
    SplashComponent,
    JobFormComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
