import {Component} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'node-express-angular';
  status = 'DOWN';

  constructor(public authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {
    this.authService.isLogin().subscribe(value => {
      if (value.data) {
        this._snackBar.open(value.message, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
        });
        this.router.navigate(['./cards']);
      } else {
        this.router.navigate(['./login']);
      }
    }, error => {
      debugger;
    })
  }

  ngOnInit() {
    /*this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });*/
  }

  logOut() {
    this.authService.logout().subscribe(value => {
      this.router.navigate(['./login']);
    });
  }
}
