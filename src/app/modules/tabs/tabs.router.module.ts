import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(m => m.DashboardModule)
          }
        ]
      },
      {
        path: 'income',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../income/income.module').then(m => m.IncomeModule)
          }
        ]
      },
      {
        path: 'expenses',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../expenses/expenses.module').then(m => m.ExpensesModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/expenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
