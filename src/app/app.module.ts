import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMasonryModule } from 'ngx-masonry';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from '@components/core/navigation/navigation.component';
import { IndexComponent } from '@pages/auth/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExtensionsModule, MaterialExtensionsExperimentalModule } from '@ng-matero/extensions';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { HarperDbService } from './services/harperdb.service';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { SocialsComponent } from './pages/auth/socials/socials.component';
import { MarkdownPipe } from './markdown.pipe';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { LogoComponent } from './components/shared/logo/logo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInRedirectGuard } from './guards/logged-in-redirect-guard.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { NetworksComponent } from './pages/networks/networks.component';
import { ClerkService } from './services/clerk.service';
import { WindowRef } from './services/window.service';
import { NewProjectComponent } from './pages/auth/new-project/new-project.component';
import { LoaderComponent } from './loader/loader.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { FlashcollProfileComponent } from './pages/flashcoll-profile/flashcoll-profile.component';

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
    ProjectdetailsComponent,
    LogoComponent,
    ProjectsComponent,
    NotificationComponent,
    NetworksComponent,
    NewProjectComponent,
    LoaderComponent,
    ProjectCardComponent,
    FlashcollProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExtensionsModule,
    MaterialExtensionsExperimentalModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMasonryModule,
    ShareModule,
    ShareButtonsModule,
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
