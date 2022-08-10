import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./shared/auth.service";

const routes: Routes = [
  {
    path: 'users',
    canActivate: [AuthService],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'cards',
    canActivate: [AuthService],
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'bank-accounts',
    canActivate: [AuthService],
    loadChildren: () => import('./bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cash',
    canActivate: [AuthService],
    loadChildren: () => import('./cash/cash.module').then(m => m.CashModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
