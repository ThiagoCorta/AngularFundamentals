import { Component, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from 'src/app/common/toastr.service';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `
  ]
})
export class LoginComponent {
  public userName: string;
  public password: string;
  public mouseoverLogin: boolean;
  public loginInvalid = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}
  login(formValues) {
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe(res => {
        if (!res) {
          this.loginInvalid = true;
          return;
        } else {
          this.router.navigate(['events']);
          this.toastr.success('Te logeaste bien!!');
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  logout() {}
}
