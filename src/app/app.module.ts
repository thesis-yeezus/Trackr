import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { ModalModule }      from 'ng2-modal';

import { AppComponent }     from './app.component';
import { SignupComponent }  from './signup/signup.component';
import { MainComponent }    from './main/main.component';
import { LoginComponent }   from './shared/login.component';
import { SignoutComponent } from './shared/signout.component';
import { SplashComponent }  from './splash/splash.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    NgSemanticModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent,
    SplashComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
