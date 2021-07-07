import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClerkService } from './service/clerk';

let clerkService: any;
async function clerk () {
  clerkService = new ClerkService();  
  return clerkService.initClerk();
}

@NgModule({
  declarations: [
    AppComponent,
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
