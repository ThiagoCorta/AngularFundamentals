import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISessions } from '../shared/event.model';
import { SessionListComponent } from './sessionList//session-list.component';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding.left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
    `
  ]
})
export class EventDetailComponent implements OnInit {
  public event: IEvent;
  public addMode: boolean;
  public filterBy = 'all';
  public sortBy = 'votes';
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.data.forEach(data => {
      this.event = data.event;
      this.addMode = false;
    });
    this.filterBy = 'all';
    this.sortBy = 'votes';
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISessions) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map(s => s.id)
    );
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe(() => {
      this.addMode = false;
    });
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
