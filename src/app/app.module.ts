import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from '@components/core/navigation/navigation.component';
import { IndexComponent } from '@pages/auth/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExtensionsModule, MaterialExtensionsExperimentalModule } from '@ng-matero/extensions';

import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { HarperDbService } from './services/harperdb.service';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { SocialsComponent } from './pages/auth/socials/socials.component';
import { MarkdownPipe } from './markdown.pipe';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import {MatMenuModule} from '@angular/material/menu';
import { AppLayoutComponent } from './components/core/app-layout/app-layout.component';
import { ProjectdetailsComponent } from './components/projectdetails/projectdetails.component';
import { LogoComponent } from './components/shared/logo/logo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInRedirectGuard } from './guards/logged-in-redirect-guard.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { NetworksComponent } from './pages/networks/networks.component';
import { ClerkService } from './services/clerk.service';
import { WindowRef } from './services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IndexComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    SocialsComponent,
    MarkdownPipe,
    NotAuthorizedComponent,
    NotFoundComponent,
    AppLayoutComponent,
    ProjectdetailsComponent,
    LogoComponent,
    ProjectsComponent,
    NotificationComponent,
    NetworksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExtensionsModule,
    MaterialExtensionsExperimentalModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: [
    HarperDbService,
    ClerkService,
    WindowRef,
    AuthGuardGuard,
    LoggedInRedirectGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
