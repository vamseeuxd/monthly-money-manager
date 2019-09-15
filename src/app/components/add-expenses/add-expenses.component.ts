import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IExpenses } from 'src/app/models/expenses';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss'],
})
export class AddExpensesComponent {

  @Output() add: EventEmitter<IExpenses> = new EventEmitter<IExpenses>();

  isImportant = false;
  expensesName = '';

  constructor(public alertController: AlertController) { }

  addExpensesClick() {
    if (this.expensesName.trim().length > 0) {
      this.presentAlertPrompt();
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: `Enter Amount for "${this.expensesName}"`,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: `Enter Amount`
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.amount);
            this.add.emit(
              {
                isImportant: this.isImportant,
                name: this.expensesName,
                done: false,
                amount: alertData.amount,
                repeat: 'neverRepeat'
              }
            );
            this.isImportant = false;
            this.expensesName = '';
          }
        }
      ]
    });

    await alert.present();
  }

}
