import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardsComponent} from './cards.component';
import {ShowCardsComponent} from "./show-cards/show-cards.component";
import {EditCardComponent} from "./edit-card/edit-card.component";
import {AddCardComponent} from "./add-card/add-card.component";

const routes: Routes = [
  {path: '', redirectTo: 'show-all', pathMatch: 'full'},
  {path: 'show-all', component: ShowCardsComponent},
  {path: 'edit/:id', component: EditCardComponent},
  {path: 'add', component: AddCardComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule {
}
