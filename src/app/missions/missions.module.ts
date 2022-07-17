import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionComponent } from './Components/mission/mission.component';
import { MissionListComponent } from './Components/mission-list/mission-list.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MissionComponent,
    MissionListComponent
  ],
  imports: [
    CommonModule,
    MissionsRoutingModule,
    FormsModule,
    SharedModule,
    NgbModule,
    DpDatePickerModule,
    NgxPaginationModule,
  ]
})
export class MissionsModule { }
