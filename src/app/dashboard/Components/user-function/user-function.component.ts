import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterStatusType, FilterType } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-user-function',
  templateUrl: './user-function.component.html',
  styleUrls: ['./user-function.component.scss'],
})
export class UserFunctionComponent implements OnInit {

  editTask;
  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};
  @Output() queryEmit = new EventEmitter<any>();
  query :any={pageNumber:1,
    pageSize:10,
    searchKey:''
  }
  confirmedType = FilterStatusType.GETALL;

  constructor(public dashboardService: DashboardService ,public taskService:TaskService) {}


  ngOnInit(): void {
    this.queryEmit.emit(this.query);
  }
  onEdit(e) {
    this.editTask=e;       
  }
  onSearch()
  {
    this.queryEmit.emit(this.query);    
  }
  onChangeTable(e)
  {
    this.query.pageNumber=e;    
    this.taskService.getAll(this.query.searchKey ,this.query.pageNumber,this.query.pageSize,this.dateType ,this.confirmedType);     
  }
  
}
