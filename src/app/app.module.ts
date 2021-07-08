import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClerkService } from './service/clerk-service/clerk';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/core/header/header.component';
import { IndexComponent } from './pages/auth/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';

let clerkService: any;
async function clerk () {
  clerkService = new ClerkService();  
  return clerkService.initClerk();
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    HeaderComponent,
    IndexComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  exports: [
  
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => clerk,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
