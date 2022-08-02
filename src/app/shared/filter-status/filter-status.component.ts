import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterStatusType } from 'src/app/Models/login';

@Component({
  selector: 'app-filter-status',
  templateUrl: './filter-status.component.html',
  styleUrls: ['./filter-status.component.scss']
})
export class FilterStatusComponent implements OnInit {

  filterStatusType=FilterStatusType;
  @Output() filterStatus = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onFilterStatus(type)
  {
    this.filterStatus.emit(type)
  }
}
