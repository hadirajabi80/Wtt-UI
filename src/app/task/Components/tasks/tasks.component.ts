import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/Services/task.service';
import { FilterStatusType, FilterTaskLocation, FilterType } from 'src/app/Models/login';
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
  confirmedType = FilterStatusType.GETALL;
  taskLocation =FilterTaskLocation.GETALL;
  constructor(public taskService:TaskService ,
    public taskLocationService:TaskLocationService,
    public projectService:ProjectService
     ) { }


  ngOnInit(): void {     
   this.taskService.getAll(this.searchKey,this.pageNumber,this.pageSize ,this.dateType , this.confirmedType , this.taskLocation);
   this.projectService.getProjects();
  }
  onChangeTable(e)
  {
    this.pageNumber=e;    
    this.taskService.getAll(this.searchKey ,this.pageNumber,this.pageSize,this.dateType , this.confirmedType , this.taskLocation);     
  }
  onEdit(e)
  {
    this.editTask=e;
  }

}
