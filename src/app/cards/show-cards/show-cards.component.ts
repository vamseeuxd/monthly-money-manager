import {Component, HostBinding, OnInit} from '@angular/core';
import {random} from "lodash";

@Component({
  selector: 'app-show-cards',
  templateUrl: './show-cards.component.html',
  styleUrls: ['./show-cards.component.scss']
})
export class ShowCardsComponent implements OnInit {
  @HostBinding('class') cssClass = 'd-block position-relative';
  cards: any[] = Array.from(Array(10).keys()).map(key => {
    return {
      name: 'Credit Card ' + key,
      number: random(1000000000000000, 9999999999999999)
    }
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  formatCardNumber(val: number): string {
    // @ts-ignore
    return val.toString().match(/.{1,4}/g).join('-');
  }

  deleteCard(card: any) {
    const isConfirm = confirm('Are you sure!Do you want to delete the card?');
  }
}
