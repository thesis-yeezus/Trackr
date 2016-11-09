import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { ModalModule } from 'ng2-modal';
import { AgGridModule } from 'ag-grid-ng2/main';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './shared/login.component';
import { SignoutComponent } from './shared/signout.component';
import { SplashComponent } from './splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withNg2ComponentSupport(),
    FormsModule,
    HttpModule, 
    NgSemanticModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
