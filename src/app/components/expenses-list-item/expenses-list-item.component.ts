import { Component, OnInit, Input } from '@angular/core';
import { IExpenses } from 'src/app/models/expenses';

@Component({
  selector: 'app-expenses-list-item',
  templateUrl: './expenses-list-item.component.html',
  styleUrls: ['./expenses-list-item.component.scss'],
})
export class ExpensesListItemComponent implements OnInit {
  @Input() data: IExpenses = {
    done: false,
    isImportant: true,
    name: 'Todo Test',
    amount: 0
  }
  constructor() { }

  ngOnInit() { }

}
