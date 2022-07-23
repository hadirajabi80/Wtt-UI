import { Component, OnInit } from '@angular/core';
import { FilterType, LoginTime } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { ProjectService } from 'src/app/Services/project.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserLoginTimeService } from 'src/app/Services/user-login-time.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  addLoginTime: number;

  lastState: LoginTime;

  isStarted: boolean = false;

  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};

  time: string = '00:00';
  showTime: boolean = false;
    queryEmit :any={pageNumber:1,
    pageSize:10,
    searchKey:''
  }
  constructor(
    public userLoginTimeService: UserLoginTimeService,
    public dashboardService:DashboardService,
    public taskService:TaskService,
    public projectService:ProjectService
  ) {}
  ngOnInit(): void {    
    this.userLoginTimeService.getUserLastStatus().subscribe((res) => {
      this.lastState = res;
      this.isStarted = this.lastState && this.lastState.endTime == null;
      if(res.startTime !=null)
      {
        this.calcTime(res.startTime);
      }
      this.projectService.getProjects();
    });
    this.dashboardService.getAll(this.dateType);
    this.taskService.getAll(this.queryEmit.searchKey,this.queryEmit.pageNumber,this.queryEmit.pageSize ,this.dateType);

  }
  startTime() {
    this.isStarted = !this.isStarted;
    this.addLoginTime = 1;
    this.userLoginTimeService.add(this.addLoginTime);
  }
  endTime() {
    this.isStarted = !this.isStarted;
    this.showTime =false;
    this.addLoginTime = 0;
    this.userLoginTimeService.add(this.addLoginTime);
  }
  isTokenValid() {
    let token = localStorage.getItem('token');
    if (token) {
      return false;
    } else {
      return true;
    }
  }
  filterDate(date) {
    this.dateType = date;    
    this.dashboardService.getAll(this.dateType);
                    
  }
  calcTime(startTime: number) {
    this.elapsedTime(startTime);
    setInterval(() => {
      this.elapsedTime(startTime);
    }, 60000);
  }

  elapsedTime(startTime: number) {
    let TimeDifference = (Date.now() / 1000 - startTime) / 60;
    var hour = Math.floor(TimeDifference / 60);
    var min = Math.floor(TimeDifference % 60);
    var time =
      String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0');
    this.time = time;
  }
  query(e)
  {
    this.queryEmit=e;
    this.queryEmit.pageNumber=1;
    this.taskService.getAll(this.queryEmit.searchKey,this.queryEmit.pageNumber,this.queryEmit.pageSize ,this.dateType);    
  }

}
