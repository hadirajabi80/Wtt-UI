import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './Components/task/task.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { AddTaskComponent } from './Components/add-task/add-task.component';


@NgModule({
  declarations: [
    TaskComponent,
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TaskRoutingModule,
    NgbModule,
    DpDatePickerModule,
    NgxPaginationModule,
    SharedModule,


  ],
  exports:[TaskComponent,TasksComponent,AddTaskComponent]
})
export class TaskModule { }
