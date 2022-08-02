import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterType } from 'src/app/Models/login';
import { UserPresenceService } from 'src/app/Services/user-presence.service';

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
  constructor(public userPresenceService: UserPresenceService) {}
  ngOnInit(): void {    
    this.userPresenceService.getAll(
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
    
  }
  onDelete(id) {
    this.userPresenceService.delete(id);
  }
  onChangeTable(e) {
      this.pageNumber = e;
      this.userPresenceService.getAll(
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
  }
  onEdit(presence) {
    this.editPresence.emit(presence);
  }
}
