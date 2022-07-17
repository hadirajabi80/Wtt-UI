import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresenceRoutingModule } from './presence-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresenceComponent } from './Components/presence/presence.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PresenceListComponent } from './Components/presence-list/presence-list.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { JalaliPipe } from '../Models/custom-pipe';

@NgModule({
  declarations: [
    PresenceComponent,
    PresenceListComponent,
    JalaliPipe
    ],
  imports: [
    CommonModule,
    PresenceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbModule,
    DpDatePickerModule,
    NgxPaginationModule
    ]
})
export class PresenceModule { }
