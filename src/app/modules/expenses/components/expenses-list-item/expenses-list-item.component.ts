import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IExpenses} from 'src/app/modules/expenses/models/expenses';

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
    };

    @Output() updateExpenses: EventEmitter<IExpenses> = new EventEmitter<IExpenses>();

    constructor() {
    }

    ngOnInit() {
    }

    updateStatus($event: MouseEvent) {
        $event.stopPropagation();
        this.data.done = !this.data.done;
        this.updateExpenses.emit(this.data);
    }

    updateIsStarred($event: MouseEvent) {
        $event.stopPropagation();
        this.data.isImportant = !this.data.isImportant;
        this.updateExpenses.emit(this.data);
    }
}
