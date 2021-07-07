import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClerkService } from './service/clerk';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

let clerkService: any;
async function clerk () {
  clerkService = new ClerkService();  
  return clerkService.initClerk();
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => clerk,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
