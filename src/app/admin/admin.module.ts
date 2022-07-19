import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddUserComponent } from './Components/admin-add-user/admin-add-user.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminUserListComponent } from './Components/admin-user-list/admin-user-list.component';
import { AdminComponent } from './Components/admin/admin.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminAddUserComponent,
    AdminUserListComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
