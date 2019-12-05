import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent {
  @Input() count: number;
  @Input() set voted(value) {
    this.iconColor = value ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter();
  public iconColor: string;

  onClick() {
    this.vote.emit({});
  }
}
