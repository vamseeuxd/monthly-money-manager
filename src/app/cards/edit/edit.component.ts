import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject, switchMap} from "rxjs";
import {ICard} from "../../shared/value-objects/ICard.interface";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  card: ICard | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    public http: HttpClient,
    public activeRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    debugger;
    const cardId = (this.activeRoute.snapshot.params as any).id;
    const subscription = this.http.get<{ data: ICard, message: string }>('api/cards/' + cardId).subscribe(value => {
      this.card = value.data;
      subscription.unsubscribe();
    }, error => {
      this._snackBar.open(error.error.message, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    })
  }

  saveAndClose(editForm: NgForm) {
    this.http.put<{ data: ICard, message: string }>('api/cards/' + this.card?.id, editForm.value).subscribe(value => {
      editForm.resetForm({});
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
}
