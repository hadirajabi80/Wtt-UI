import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddUserComponent } from './Components/admin-add-user/admin-add-user.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminAddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
