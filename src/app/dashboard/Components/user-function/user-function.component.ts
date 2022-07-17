import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterType, UserTask } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-user-function',
  templateUrl: './user-function.component.html',
  styleUrls: ['./user-function.component.scss'],
})
export class UserFunctionComponent implements OnInit {

  dateType :any = {type:FilterType.CURRENT_MONTH};

  @Input() task: UserTask;
  @Output() editTask = new EventEmitter<any>();
  @Output() queryEmit = new EventEmitter<any>();
  query :any={pageNumber:1,
    pageSize:10,
    searchKey:''
  }
  constructor(public dashboardService: DashboardService ,public taskService:TaskService) {}

  ngOnInit(): void {
    this.editTask.emit(this.task);
    this.queryEmit.emit(this.query);
  }
  onEdit() {
    this.editTask.emit(this.task);
  }
  onSearch()
  {
    this.queryEmit.emit(this.query);    
  }
  onChangeTable(e)
  {
    this.query.pageNumber=e;    
    this.taskService.getAll(this.query.searchKey ,this.query.pageNumber,this.query.pageSize,this.dateType);     
    
  }
}
