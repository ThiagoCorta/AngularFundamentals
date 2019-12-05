import { Component, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Component({
  selector: 'simple-modal',
  templateUrl: './simpleModal.component.html',
  styles: [
    `
      .modal-body {
        height: 250px;
        overflow-y: scroll;
      }
    `
  ]
})
export class SimpleModalComponent {
  @Input() title: string;
  @Input() elementId: string;
  @Input() closeOnBodyClick: string;
  @ViewChild('modalContainer', { static: true }) modal: ElementRef;

  constructor(@Inject(JQUERY_TOKEN) private $: any) {}
  closeModal(): void {
    if (this.closeOnBodyClick.toLocaleLowerCase() !== 'true') { return; }
    this.$(this.modal.nativeElement).modal('hide');
  }
}
