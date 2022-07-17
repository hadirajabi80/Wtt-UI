import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'jalali-moment';
import { UserVacation } from 'src/app/Models/login';
import { UserVacationService } from 'src/app/Services/user-vacation.service';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent implements OnInit {

  searchKey:string='';
  regDate;
  @Input() userVacation:UserVacation;
  @Output() editVacation = new EventEmitter<any>();
  constructor(public userVacationService:UserVacationService) { }
  public isShowed = true;
  ngOnInit(): void {
    this.regDate=moment(this.userVacation.date).locale('fa').format('jYYYY-jMM-jDD');
    
  }
  onDelete(id)
  {
    this.userVacationService.delete(id);
  }
  onEdit()
  {
    this.editVacation.emit(this.userVacation);
  }

}
