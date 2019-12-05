import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  @Input('modal-trigger') modalId: string;
  private el: HTMLElement;
  constructor(element: ElementRef, @Inject(JQUERY_TOKEN) private $: any) {
    this.el = element.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
