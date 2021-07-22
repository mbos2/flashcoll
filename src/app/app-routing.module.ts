import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { IndexComponent } from '@pages/auth/index/index.component';
import { ProfileComponent } from '@pages/auth/profile/profile.component';
import { NotAuthorizedComponent } from '@pages/not-authorized/not-authorized.component';
import { SocialsComponent } from '@pages/auth/socials/socials.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectdetailsComponent } from '@components/projectdetails/projectdetails.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'app',
    component: IndexComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent, 
  },
  {
    path: 'socials',
    component: SocialsComponent, 
  },
  {
    path: 'details',
    component: ProjectdetailsComponent,
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
