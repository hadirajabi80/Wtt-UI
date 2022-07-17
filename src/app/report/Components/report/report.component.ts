import { Component, OnInit } from '@angular/core';
import { FilterType } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};

  constructor(public dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getAll(this.dateType);
  }
  filterDate(date) {
    this.dateType = date;    
    this.dashboardService.getAll(this.dateType);         
  }
}
