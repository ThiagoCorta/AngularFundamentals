import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { EventService } from './shared/event.service';

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `
  em { float: right; color#E05C65; padding-left: 10px;}
  .error input { background-color: #E3C3C5  }
  .error ::-webkit-input-placeholder{ color : #999}
  .error ::-moz-placeholder{ color : #999}
  .error :-moz-placeholer {color : #999}
  .error :ms-input-placehold{ color : #999}
  `
  ]
})
export class CreateEventComponent {
  isDirty = true;
  public newEvent;
  constructor(private router: Router, private eventService: EventService) {}

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.handleCancelClick();
    });
  }

  public handleCancelClick() {
    this.router.navigate(['/events']);
  }
}
