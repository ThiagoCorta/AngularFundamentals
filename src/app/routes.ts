import { EventListComponent } from './events/events-list.component';
import { EventDetailComponent } from './events/event-details/event-details.component';
import { Routes } from '@angular/router';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventListResolver } from './events/event-list-resolver.service';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventResolver } from './events/event-resolver.service';

export const appRoutes: Routes = [
  {
    path: 'events',
    component: EventListComponent,
    resolve: {
      events: EventListResolver
    }
  },
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    resolve: { event: EventResolver }
  },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];
