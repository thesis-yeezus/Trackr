import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './shared/login.component';
import { SignoutComponent } from './shared/signout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    LoginComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
