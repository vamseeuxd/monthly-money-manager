import {Component, HostBinding, OnInit} from '@angular/core';
import {random} from "lodash";
import {HttpClient} from "@angular/common/http";
import {ICard} from "../../shared/value-objects/ICard.interface";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-show-cards',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @HostBinding('class') cssClass = 'd-block position-relative';
  /*cards: any[] = [];*/
  refresh: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  cards$: Observable<ICard[]> = this.refresh.asObservable().pipe(switchMap(value => {
    return this.http.get<{ data: ICard[], message: string }>('api/cards').pipe(map(d => d.data))
  }))

  /*Array.from(Array(10).keys()).map(key => {
  return {
    name: 'Credit Card ' + key,
    number: random(1000000000000000, 9999999999999999)
  }
});*/

  constructor(
    private _snackBar: MatSnackBar,
    public http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  formatCardNumber(val: string): string {
    // @ts-ignore
    return val.toString().match(/.{1,4}/g).join('-');
  }

  deleteCard(card: ICard) {
    const isConfirm = confirm('Are you sure!Do you want to delete the card?');
    if (isConfirm) {
      this.http.delete<{ data: ICard, message: string }>('api/cards/' + card.id).subscribe(value => {
        this._snackBar.open(value.message, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
        });
        this.refresh.next(new Date());
      }, error => {
        this._snackBar.open(error.error.message, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
        });
      })
    }
  }
}
