import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { UserFunctionComponent } from './Components/user-function/user-function.component';
import { TaskModule } from '../task/task.module';
import { ChartsComponent } from './Components/charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { UserInfoComponent } from './Components/user-info/user-info.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserFunctionComponent,
    ChartsComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DpDatePickerModule,
    NgxPaginationModule,
    TaskModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
