import {Component} from '@angular/core';
import {IExpenses} from 'src/app/modules/expenses/models/expenses';
import {LoadingController, ModalController} from '@ionic/angular';
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
        public loadingController: LoadingController,
    ) {
        this.subscribeExpenses();
        this.initializeLoader();

    }

    initializeLoader() {
    }

    async showLoader() {
        const loader = await this.loadingController.create({message: 'Please Wait...'});
        await loader.present();
    }

    hideLoader() {
        this.loadingController.dismiss().then(value => {
            console.log('Expenses Loader Closed');
        });
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
            componentProps: {data}
        });

        return await modal.present().then(value => {
            modal.onDidDismiss().then(dismisResponse => {
                switch (dismisResponse.role) {
                    case 'update':
                        this.updateExpenses(dismisResponse.data);
                        break;
                    case 'delete':
                        this.deleteExpenses(dismisResponse.data);
                        break;
                }
            });
        });
    }

    updateExpenses($event: IExpenses) {
        this.showLoader().then(value => {
            this.expensesService.update($event.key, $event).then(value1 => {
                this.hideLoader();
            }, reason => {
                console.log(reason);
                this.hideLoader();
            });
        });
    }

    deleteExpenses($event: IExpenses) {
        this.showLoader().then(value => {
            this.expensesService.remove($event.key).then(value1 => {
                this.hideLoader();
            }, reason => {
                console.log(reason);
                this.hideLoader();
            });
        });
    }
}
