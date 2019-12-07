import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {ManageExpensesRepeatOptionsComponent} from '../manage-expenses-repeat-options/manage-expenses-repeat-options.component';

@Component({
    selector: 'app-expenses-settings',
    templateUrl: './expenses-settings.component.html',
    styleUrls: ['./expenses-settings.component.scss'],
})
export class ExpensesSettingsComponent {

    manageExpensesRepeatOptions = ManageExpensesRepeatOptionsComponent;

    constructor(
        public modalController: ModalController,
        private menu: MenuController
    ) {
    }

    async showSettings(component: any) {
        const modal = await this.modalController.create({
            component,
            componentProps: {}
        });
        return await modal.present().then(value => {
            this.menu.close();
        });
    }
}
