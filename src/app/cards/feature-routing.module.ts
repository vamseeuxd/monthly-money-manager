import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeatureComponent} from './feature.component';
import {ShowComponent} from "./show/show.component";
import {EditComponent} from "./edit/edit.component";
import {AddComponent} from "./add/add.component";

const routes: Routes = [
  {path: '', redirectTo: 'show-all', pathMatch: 'full'},
  {path: 'show-all', component: ShowComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'add', component: AddComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {
}
