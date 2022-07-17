import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DatePickerComponent } from './Components/date-picker/date-picker.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterDateComponent } from './Components/filter-date/filter-date.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  declarations: [
    DatePickerComponent,
    FilterDateComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DpDatePickerModule,
    FormsModule,
    NgbModule,
    NzTimePickerModule
  ],
  exports:[
    DatePickerComponent,
    FilterDateComponent,
  ]
})
export class SharedModule { }
