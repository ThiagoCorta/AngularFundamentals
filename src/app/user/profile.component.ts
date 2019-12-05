import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';

@Component({
  templateUrl: './profile.component.html',
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
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit(): void {
    const firstName = new FormControl(this.authService.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*')
    ]);
    const lastName = new FormControl(this.authService.currentUser.lastName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*')
    ]);
    this.profileForm = new FormGroup({
      firstName,
      lastName
    });
  }

  validateFirstName() {
    return !(
      this.profileForm.controls.firstName.invalid ||
      this.profileForm.controls.firstName.touched
    );
  }

  validateLastName() {
    return !(
      this.profileForm.controls.lastName.invalid ||
      this.profileForm.controls.lastName.touched
    );
  }

  cancel(): void {
    this.router.navigate(['events']);
  }

  saveProfile(formValues): void {
    if (!this.profileForm.valid) { return; }
    this.authService
      .updateCurrentUser(formValues.firstName, formValues.lastName)
      .subscribe(data => this.toastr.success('Profile saved'));
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
