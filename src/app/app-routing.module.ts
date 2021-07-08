import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClerkAuthGuardGuard } from '@guards/clerk-auth-guard.guard';
import { IndexComponent } from '@pages/auth/index/index.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'app',
    component: IndexComponent,
    canActivate: [ClerkAuthGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ClerkAuthGuardGuard]
})
export class AppRoutingModule { }
