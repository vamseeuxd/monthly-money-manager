import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  cardId = '';

  constructor(public activeRoute:ActivatedRoute) {
    this.cardId = (this.activeRoute.snapshot.params as any).id;
    console.log(this.cardId);
  }

  ngOnInit(): void {
  }

}
