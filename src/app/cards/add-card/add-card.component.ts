import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ICard} from "../../shared/value-objects/ICard.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    public http: HttpClient,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  saveAndClose(addForm: NgForm) {
    this.http.post<{ data: ICard, message: string }>('api/cards', addForm.value).subscribe(value => {
      addForm.resetForm({});
      this.router.navigate(['cards', 'show-all'])
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

  saveAndAddNew(addForm: NgForm) {
    this.http.post<{ data: ICard, message: string }>('api/cards', addForm.value).subscribe(value => {
      addForm.resetForm({});
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
