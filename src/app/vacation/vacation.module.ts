import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRoutingModule } from './vacation-routing.module';
import { VacationComponent } from './Components/vacation/vacation.component';
import { VacationListComponent } from './Components/vacation-list/vacation-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    VacationComponent,
    VacationListComponent
  ],
  imports: [
    CommonModule,
    VacationRoutingModule,
    FormsModule,
    SharedModule,
    NgbModule,
    DpDatePickerModule,
    NgxPaginationModule,
    
  ]
})
export class VacationModule { }
