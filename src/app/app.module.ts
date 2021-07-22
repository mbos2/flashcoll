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
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import {MatMenuModule} from '@angular/material/menu';
import { AppLayoutComponent } from './components/core/app-layout/app-layout.component';
import { SidenavigationComponent } from './components/core/sidenavigation/sidenavigation.component';
import { ProjectdetailsComponent } from './components/projectdetails/projectdetails.component';
import { LogoComponent } from './components/shared/logo/logo.component';

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
    LandingComponent,
    NotFoundComponent,
    AppLayoutComponent,
    SidenavigationComponent,
    ProjectdetailsComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExtensionsModule,
    MaterialExtensionsExperimentalModule,
    MatMenuModule
  ],
  exports: [],
  providers: [
    HarperDbService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    },
    AuthGuardGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
