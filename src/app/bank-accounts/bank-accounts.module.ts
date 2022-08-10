import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountsRoutingModule } from './bank-accounts-routing.module';
import { BankAccountsComponent } from './bank-accounts.component';


@NgModule({
  declarations: [
    BankAccountsComponent
  ],
  imports: [
    CommonModule,
    BankAccountsRoutingModule
  ]
})
export class BankAccountsModule { }
