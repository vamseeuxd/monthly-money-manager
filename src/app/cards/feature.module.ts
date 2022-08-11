import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeatureRoutingModule} from './feature-routing.module';
import {FeatureComponent} from './feature.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {ShowComponent} from './show/show.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    FeatureComponent,
    AddComponent,
    EditComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
  ]
})
export class FeatureModule {
}
