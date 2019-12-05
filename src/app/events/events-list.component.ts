import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './shared/event.service';
import { IEvent } from './shared/event.model';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { inject } from '@angular/core/testing';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div class="row">
        <div *ngFor="let event of events" class="col-md-6">
          <event-thumbnail
            (click)="handleThumbNailClick(event.name)"
            [event]="event"
          ></event-thumbnail>
        </div>
      </div>
    </div>
  `
})
export class EventListComponent implements OnInit {
  public events: IEvent[];
  constructor(
    private eventService: EventService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
  }

  handleThumbNailClick(eventName) {
    this.toastr.success(eventName);
  }
}
