import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExpensesPage} from './expenses.page';
import {AddExpensesComponent} from 'src/app/modules/expenses/components/add-expenses/add-expenses.component';
import {ExpensesListItemComponent} from 'src/app/modules/expenses/components/expenses-list-item/expenses-list-item.component';
import {ExpensesEditorComponent} from 'src/app/modules/expenses/components/expenses-editor/expenses-editor.component';
import {DatePickerModule} from 'ionic4-date-picker';
import {ExpensesSettingsComponent} from './components/expenses-settings/expenses-settings.component';
import {ManageExpensesRepeatOptionsComponent} from './components/manage-expenses-repeat-options/manage-expenses-repeat-options.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        DatePickerModule,
        RouterModule.forChild([{path: '', component: ExpensesPage}])
    ],
    declarations: [
        ExpensesPage,
        AddExpensesComponent,
        ExpensesListItemComponent,
        ExpensesEditorComponent,
        ExpensesSettingsComponent,
        ManageExpensesRepeatOptionsComponent
    ],
    entryComponents: [
        ExpensesEditorComponent,
        ExpensesSettingsComponent,
        ManageExpensesRepeatOptionsComponent
    ]
})
export class ExpensesModule {
}
