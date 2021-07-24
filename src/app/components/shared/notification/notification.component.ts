import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent  {
  @Input() successIndicator: any;
  @Input() message: any;

  deleteNotification() {
    const button = document.querySelector('.delete');
    const $notification = button?.parentNode;
    $notification?.parentNode?.removeChild($notification);
  }
}
