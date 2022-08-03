import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterStatusType, FilterTaskLocation, FilterType } from 'src/app/Models/login';
import { TaskService } from 'src/app/Services/task.service';
import { UserMissionService } from 'src/app/Services/user-mission.service';
import { UserPresenceService } from 'src/app/Services/user-presence.service';
import { UserVacationService } from 'src/app/Services/user-vacation.service';

@Component({
  selector: 'app-child-status',
  templateUrl: './child-status.component.html',
  styleUrls: ['./child-status.component.scss']
})
export class ChildStatusComponent implements OnInit,OnChanges {

  regDate;
  time;
  userId:number;
  userTask;
  pageNumber:number=1;
  pageSize:number=10;
  searchKey: string = '';
  @Input() type : number ;
  @Input()dateType:any = {type:FilterType.CURRENT_MONTH_TODAY};
  @Input()confirmedType = FilterStatusType.GETALL;
  @Input()showHome:boolean =false;
  
  taskLocation =FilterTaskLocation.GETALL;
  
  constructor(public taskService:TaskService,
    private route:ActivatedRoute,
    public userVacationService:UserVacationService,
    public userMissionService:UserMissionService,
    public userPresenceService :UserPresenceService
    ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.type==1)
    {
      this.taskService.getTaskByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType , this.taskLocation);      
    }
    if(this.type==2)
    {
      this.userVacationService.getVacationsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    }
    if(this.type==3)
    {
      this.userMissionService.getMissionsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    }
    if(this.type==4)
    {
      this.userPresenceService.getPresenceByAdmin(this.pageNumber,this.pageSize,this.dateType,this.userId)
    }
    if (this.showHome) 
    {      
      this.taskService.getTaskByAdmin('',1,10, this.dateType ,this.userId , this.confirmedType,FilterTaskLocation.HOME);
    }
    else
    {
      this.taskService.getTaskByAdmin('',1,10, this.dateType ,this.userId , this.confirmedType,FilterTaskLocation.GETALL);
    }
  }


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    
  }
  onChangeTable(e)
  {
    this.pageNumber=e;
    if(this.type==1)
    {
      this.taskService.getTaskByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType);
    }    
    if(this.type==2)
    {
      this.userVacationService.getVacationsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    } 
    if(this.type==3)
    {
      this.userMissionService.getMissionsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    }
    if(this.type==4)
    {
      this.userPresenceService.getPresenceByAdmin(this.pageNumber,this.pageSize,this.dateType,this.userId)
    }      
  }
  onSearch()
  {
    this.pageNumber=1;
    if(this.type==1)
    {
      this.taskService.getTaskByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType);
    }      
    if(this.type==2)
    {
      this.userVacationService.getVacationsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    }
    if(this.type==3)
    {
      this.userMissionService.getMissionsByAdmin(this.searchKey,this.pageNumber,this.pageSize,this.dateType,this.userId , this.confirmedType)
    }
    if(this.type==4)
    {
      this.userPresenceService.getPresenceByAdmin(this.pageNumber,this.pageSize,this.dateType,this.userId)
    }        
  }
  onShowHome()
  {    
    this.showHome=!this.showHome;
    if (this.showHome) 
    {
      this.taskService.getAll('',1,10, this.dateType , this.confirmedType,FilterTaskLocation.HOME);
    }
    else
    {
      this.taskService.getAll('',1,10, this.dateType , this.confirmedType,FilterTaskLocation.GETALL)
    }
  }
}
