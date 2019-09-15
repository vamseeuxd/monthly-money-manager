import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import {IExpenses} from 'src/app/modules/expenses/models/expenses';
import { AlertController } from '@ionic/angular';
import { AppConstans } from 'src/app/uitls/app-constants';
import {ExpensesService} from 'src/app/modules/expenses/services/expenses/expenses.service';

@Component({
  selector: 'app-expenses-editor',
  templateUrl: './expenses-editor.component.html',
  styleUrls: ['./expenses-editor.component.scss'],
})
export class ExpensesEditorComponent implements OnInit {

  @Input() data: IExpenses = {
    done: false,
    isImportant: true,
    name: 'Home Loan',
    amount: null,
    noOfrepeat: null,
    dueDate: '',
    repeat: 'neverRepeat',
    type: '',
    subType: '',
  };

  private loader;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public expensesService: ExpensesService,
    public loadingController: LoadingController,
  ) {
    this.loader = this.loadingController.create(
      {
        message: 'Please wait...',
        translucent: true,
      }
    );
  }

  async cancelClickHandler() {
    const alert = await this.alertController.create({
      header: AppConstans.cancelTitle,
      message: AppConstans.cancelMessaage,
      buttons: [
        {
          text: AppConstans.NO_LABEL,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: AppConstans.YES_LABEL,
          handler: () => {
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteClickHandler() {
    const alert = await this.alertController.create({
      header: AppConstans.deleteTitle,
      message: AppConstans.deleteMessaage,
      buttons: [
        {
          text: AppConstans.NO_LABEL,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: AppConstans.YES_LABEL,
          handler: () => {
            this.showLoader();
            this.expensesService.remove(this.data.key).then(success => {
                this.modalController.dismiss();
                this.loadingController.dismiss();
              }, error => {
                console.log(error);
                this.loadingController.dismiss();
                this.modalController.dismiss();
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async saveClickHandler() {
    const alert = await this.alertController.create({
      header: AppConstans.saveTitle,
      message: AppConstans.saveMessaage,
      buttons: [
        {
          text: AppConstans.NO_LABEL,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: AppConstans.YES_LABEL,
          handler: () => {
            const anyValidationError: string[] = this.isValid();
            if (anyValidationError && anyValidationError.length > 0) {
              this.showValidationError('Provide Valid ' + this.joinMessages(anyValidationError));
            } else {
              this.showLoader();
              this.expensesService.update(this.data.key, this.data).then(success => {
                this.modalController.dismiss();
                this.loadingController.dismiss();
              }, error => {
                console.log(error);
                this.loadingController.dismiss();
                this.modalController.dismiss();
              });

            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showValidationError(message: string) {
    const alert = await this.alertController.create({
      header: AppConstans.invalidDetailsTitle,
      message,
      buttons: [
        {
          text: AppConstans.OK_LABEL,
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }

  joinMessages(message: string[]) {
    if (message && message.length > 1) {
      const last = message.pop();
      return message.join(', ') + ' and ' + last;
    } else if (message && message.length === 1) {
      return message[0];
    } else {
      return '';
    }
  }

  isValid(): string[] {
    const returnValue = [];
    const isValidAmount = this.amountValidation();
    if (isValidAmount && isValidAmount.length > 0) {
      returnValue.push(isValidAmount);
    }

    const isValidNoOfrepeat = this.noOfTimesToRepeatValidation();
    if (isValidNoOfrepeat && isValidNoOfrepeat.length > 0) {
      returnValue.push(isValidNoOfrepeat);
    }
    return returnValue;
  }

  amountValidation(): string {
    return (this.data.amount && this.data.amount > 0) ? '' : '"Amount"';
  }

  noOfTimesToRepeatValidation(): string {
    if (this.data.repeat !== 'neverRepeat') {
      return (this.data.noOfrepeat && this.data.noOfrepeat > 0) ? '' : '"No of Times to Repeat"';
    }
    return '';
  }

  ngOnInit() { }

  async showLoader() {
    this.loader = await this.loadingController.create();
    await this.loader.present();
  }


}
