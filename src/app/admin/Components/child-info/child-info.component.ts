import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterStatusType, FilterType } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-child-info',
  templateUrl: './child-info.component.html',
  styleUrls: ['./child-info.component.scss']
})
export class ChildInfoComponent implements OnInit {
  
  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};
  userId:number;
  type:number=0;
  confirmedType = FilterStatusType.GETALL;
  showHome:boolean =false;
  constructor(
    public dashboardService : DashboardService,
    private route : ActivatedRoute
    ) { }


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.dashboardService.GetUserStatusByAdmin(this.userId,this.dateType);                 
  }
  filterDate(date) {
    this.dateType = date;    
    this.dashboardService.GetUserStatusByAdmin(this.userId,this.dateType);              
  }
  filterStatus(type)
  {
    this.confirmedType =type;
  }
  onShowHome()
  {
    this.showHome=!this.showHome;
    if(this.type!=1)
    {
      this.showHome=false;      
    }
  } 

}
