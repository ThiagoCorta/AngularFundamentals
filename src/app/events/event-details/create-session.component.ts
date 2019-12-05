import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISessions } from '../shared/event.model';
import { restrictedWords } from '../shared/restricted-words.validators';

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styles: [
    `
  em { float: right; color#E05C65; padding-left: 10px;}
  .error input, .error select, .error textarea{ background-color: #E3C3C5  }
  .error ::-webkit-input-placeholder{ color : #999}
  .error ::-moz-placeholder{ color : #999}
  .error :-moz-placeholer {color : #999}
  .error :ms-input-placehold{ color : #999}
  `
  ]
})
export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();
  public name: FormControl;
  public presenter: FormControl;
  public duration: FormControl;
  public level: FormControl;
  public abstract: FormControl;
  public newSessionForm: FormGroup;
  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
      restrictedWords(['foo', 'bar'])
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(formValue) {
    const session: ISessions = {
      id: undefined,
      name: formValue.name,
      duration: +formValue.duration,
      level: formValue.level,
      abstract: formValue.abstract,
      presenter: formValue.presenter,
      voters: []
    };
    this.saveNewSession.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
