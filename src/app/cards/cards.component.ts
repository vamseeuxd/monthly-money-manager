import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  name = 'Vamsee Kalyan Sunkara';
  number = '123456789';
  cvc = '121';
  expiry = '12/12';
  acceptedCards = ['visa', 'mastercard', , 'amex', 'visaelectron', 'unionpay', 'maestro', 'jcb', 'hipercard', 'elo', 'discover', 'dinersclub'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
