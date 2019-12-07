import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface IExpensesRepeatOption {
    name: string,
    userEmail: string,
    key?: string,
    day: number,
    position: number
}

@Component({
    selector: 'app-manage-expenses-repeat-options',
    templateUrl: './manage-expenses-repeat-options.component.html',
    styleUrls: ['./manage-expenses-repeat-options.component.scss'],
})
export class ManageExpensesRepeatOptionsComponent {

    private repeatOptionsRef: AngularFireList<any>;
    private repeatOptionsList: IExpensesRepeatOption[] = [];
    private repeatOptionsListFireBase: Observable<any[]>;

    constructor(
        public modalController: ModalController,
        public alertController: AlertController,
        public loadingController: LoadingController,
        db: AngularFireDatabase
    ) {
        this.repeatOptionsRef = db.list('expensesRepeatOptions');
        this.repeatOptionsListFireBase = this.repeatOptionsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        );
        this.repeatOptionsListFireBase.subscribe((repeatOptionsList: IExpensesRepeatOption[]) => {
            this.repeatOptionsList = repeatOptionsList;
            this.repeatOptionsList.sort((a, b) => a.position - b.position);
        });
    }

    onRenderItems(event) {
        const draggedItem = this.repeatOptionsList.splice(event.detail.from, 1)[0];
        this.repeatOptionsList.splice(event.detail.to, 0, draggedItem);
        this.repeatOptionsList = this.repeatOptionsList.map((value, index) => {
            value.position = index;
            return value;
        });
        setTimeout(async () => {
            let noOfRequests = 0;

            const loading = await this.loadingController.create({message: 'Please wait...'});
            await loading.present();

            this.repeatOptionsList.forEach((value, index) => {
                const key = value.key;
                delete value.key;
                if (key) {
                    noOfRequests = noOfRequests + 1;
                    this.repeatOptionsRef.update(key, value).then(value1 => {
                        noOfRequests = noOfRequests - 1;
                        if (noOfRequests == 0) {
                            this.loadingController.dismiss();
                        }
                    });
                }
            });
        });
        event.detail.complete();

    }

    closeSetting() {
        this.modalController.dismiss();
    }

    async addNewRepeater() {
        const alert = await this.alertController.create({
            header: `Add New Repeater`,
            inputs: [
                {name: 'name', type: 'text', placeholder: `Enter Repeater Name`},
                {name: 'days', type: 'number', placeholder: `Enter Days`}
            ],
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary'},
                {
                    text: 'Ok',
                    handler: async (alertData) => {
                        const loading = await this.loadingController.create({message: 'Please wait...'});
                        loading.present().then(value => {
                            this.repeatOptionsRef.push({
                                name: alertData.name,
                                days: alertData.days,
                                position: this.repeatOptionsList.length,
                                userEmail: 'vamsi.flex@gmail.com'
                            }).then(value1 => {
                                this.loadingController.dismiss();
                            }, reason => {
                                this.loadingController.dismiss();
                            });
                        });
                    }
                }
            ]
        });
        await alert.present().then(value => {
            const htmlInput: any = document.getElementsByClassName('alert-input');
            if (htmlInput && htmlInput.length > 0) {
                htmlInput[0].focus();
            }
        });
    }

    async deleteItem(item: IExpensesRepeatOption) {
        const alert = await this.alertController.create({
            header: `Are you sure! Do you want to delete?`,
            buttons: [
                {text: 'No', role: 'cancel', cssClass: 'secondary'},
                {
                    text: 'Yes',
                    handler: async (alertData) => {
                        const loading = await this.loadingController.create({message: 'Please wait...'});
                        loading.present().then(value => {
                            this.repeatOptionsRef.remove(item.key).then(value1 => {
                                this.loadingController.dismiss();
                            }, reason => {
                                this.loadingController.dismiss();
                            });
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
