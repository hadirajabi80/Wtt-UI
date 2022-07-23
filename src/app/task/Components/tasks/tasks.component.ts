import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/Services/task.service';
import * as moment from 'jalali-moment';
import { FilterType } from 'src/app/Models/login';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { TaskLocationService } from 'src/app/Services/task-location.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  pageNumber:number=1;
  pageSize:number=10;
  searchKey: string = '';
  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};
  editTask;
  constructor(public taskService:TaskService ,
    public taskLocationService:TaskLocationService,
    public projectService:ProjectService
     ) { }


  ngOnInit(): void {     
   this.taskService.getAll(this.searchKey,this.pageNumber,this.pageSize ,this.dateType);
   this.projectService.getProjects();
  }
  onChangeTable(e)
  {
    this.pageNumber=e;    
    this.taskService.getAll(this.searchKey ,this.pageNumber,this.pageSize,this.dateType);     
  }
  onEdit(e)
  {
    this.editTask=e;
  }

}
