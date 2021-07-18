import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '@components/sign-in/sign-in.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { AuthGuardGuard } from '@guards/auth-guard.guard';
import { IndexComponent } from '@pages/auth/index/index.component';
import { ProfileComponent } from '@pages/auth/profile/profile.component';
import { NotAuthorizedComponent } from '@pages/not-authorized/not-authorized.component';
import { SocialsComponent } from '@pages/socials/socials.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'board',
    component: IndexComponent
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
    canActivate: [AuthGuardGuard]
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
    component: SocialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
