import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from '@components/core/navigation/navigation.component';
import { HomeComponent } from '@pages/home/home.component';
import { HeaderComponent } from '@components/core/header/header.component';
import { IndexComponent } from '@pages/auth/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    HeaderComponent,
    IndexComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
