import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'jalali-moment';
import { FilterType } from 'src/app/Models/login';
import { UserLoginTimeService } from 'src/app/Services/user-login-time.service';

@Component({
  selector: 'app-presence-list',
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.scss'],
})
export class PresenceListComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  @Input() dateType: any = { type: FilterType.CURRENT_MONTH };

  @Output() editPresence = new EventEmitter<any>();
  constructor(public userLoginTimeService: UserLoginTimeService) {}
  ngOnInit(): void {    
    this.userLoginTimeService.getAll(
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
    
  }
  onDelete(id) {
    this.userLoginTimeService.delete(id);
  }
  onChangeTable(e) {
    this.pageNumber = e;
    this.userLoginTimeService.getAll(
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
  }
  onEdit(presence) {
    this.editPresence.emit(presence);
  }
}
