import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { IndexComponent } from '@pages/auth/index/index.component';
import { ProfileComponent } from '@pages/auth/profile/profile.component';
import { NotAuthorizedComponent } from '@pages/not-authorized/not-authorized.component';
import { SocialsComponent } from '@pages/auth/socials/socials.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectdetailsComponent } from '@pages/projectdetails/projectdetails.component';
import { LoggedInRedirectGuard } from './guards/logged-in-redirect-guard.guard';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { NetworksComponent } from '@pages/networks/networks.component';
import { NewProjectComponent } from '@pages/auth/new-project/new-project.component';
import { FlashcollProfileComponent } from '@pages/flashcoll-profile/flashcoll-profile.component';
// import { LandingComponent } from '@pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  // {
  //   path: 'landing',
  //   component: LandingComponent
  // },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [LoggedInRedirectGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [LoggedInRedirectGuard],
  },
  {
    path: 'app',
    component: IndexComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'profile/:username',
    component: FlashcollProfileComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent, 
  },
  {
    path: 'socials',
    component: SocialsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'networks',
    component: NetworksComponent,
  },
  {
    path: 'project/:id',
    component: ProjectdetailsComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
    canActivate: [AuthGuardGuard],
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
