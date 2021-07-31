import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('userProfile', { static: false }) private userActionContainer: ElementRef<HTMLDivElement> | undefined;
  user: User = {
    id: '',
    name: '',
    email: '',
  };
  isSubprofileActive = false;

  constructor(private clerk: ClerkService) {
    
  }

  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {          
      const el = this.userActionContainer?.nativeElement;      
      if (!el) {
        console.log('Can not fetch native element for user action!');
        return;
      }

      if (!user) {
        this.clerk.unmountUserProfile(el)
        return;
      } 

      this.clerk.mountUserProfile(el);
    })
  }

}
