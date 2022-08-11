import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value.email, loginForm.value.password).subscribe(value => {
      this._snackBar.open(value.message, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
      this.router.navigate(['./cards'])
    }, error => {
      this._snackBar.open(error.error.message, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    })
  }

  register(registrationForm: NgForm) {
    this.authService.register(registrationForm.value).subscribe(value => {
      registrationForm.resetForm({});
      this._snackBar.open(value.message, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }, error => {
      this._snackBar.open(error.error.message, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    })
  }
}
