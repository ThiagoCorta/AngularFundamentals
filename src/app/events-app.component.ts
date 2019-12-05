import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/service/auth.service';

@Component({
  selector: 'events-app',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `
})
export class EventsAppComponent implements OnInit {
  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.authservice.checkAutheticationStatus();
  }
}
