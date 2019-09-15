import { Component } from '@angular/core';
import {IExpenses} from 'src/app/modules/expenses/models/expenses';
import { ModalController } from '@ionic/angular';
import {ExpensesEditorComponent} from 'src/app/modules/expenses/components/expenses-editor/expenses-editor.component';
import {ExpensesService} from 'src/app/modules/expenses/services/expenses/expenses.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.scss']
})
export class ExpensesPage {

  expensesList: IExpenses[] = [];

  constructor(
    public modalController: ModalController,
    public expensesService: ExpensesService,
  ) {
    this.subscribeExpenses();
  }

  subscribeExpenses() {
    this.expensesService.expenssesList$.subscribe((expensesList: IExpenses[]) => {
      this.expensesList = expensesList;
    });
    this.expensesService.init();
  }

  addNewExpenses($event: IExpenses) {
    this.expensesService.add($event);
  }

  async editExpenses(data) {
    const modal = await this.modalController.create({
      component: ExpensesEditorComponent,
      componentProps: { data }
    });
    return await modal.present();
  }

}
