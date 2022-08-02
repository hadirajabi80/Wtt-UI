import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddUserComponent } from './Components/admin-add-user/admin-add-user.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminUserListComponent } from './Components/admin-user-list/admin-user-list.component';
import { AdminComponent } from './Components/admin/admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildInfoComponent } from './Components/child-info/child-info.component';
import { ChildStatusComponent } from './Components/child-status/child-status.component';
import { TaskModule } from '../task/task.module';
import { ChildTaskComponent } from './Components/child-task/child-task.component';
import { ChildMissionComponent } from './Components/child-mission/child-mission.component';
import { ChildVacationComponent } from './Components/child-vacation/child-vacation.component';
import { ChildPresenceComponent } from './Components/child-presence/child-presence.component';


@NgModule({
  declarations: [
    AdminAddUserComponent,
    AdminUserListComponent,
    AdminComponent,
    ChildInfoComponent,
    ChildStatusComponent,
    ChildTaskComponent,
    ChildMissionComponent,
    ChildVacationComponent,
    ChildPresenceComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    NgbModule,
    TaskModule,
  ]
})
export class AdminModule { }
