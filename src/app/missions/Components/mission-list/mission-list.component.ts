import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'jalali-moment';
import {  UserMission } from 'src/app/Models/login';
import { UserMissionService } from 'src/app/Services/user-mission.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  searchKey:string='';
  regDate;
  confirmType;
  @Input() userMissions:UserMission;
  @Output() editMission = new EventEmitter<any>();

  constructor(public userMissionService:UserMissionService) { }
  public isShowed = true;
  ngOnInit(): void {
    this.regDate=moment(this.userMissions.date).locale('fa').format('jYYYY-jMM-jDD');
    
  }
  onDelete(id)
  {
    this.userMissionService.delete(id);
  }
  onEdit()
  {
    this.editMission.emit(this.userMissions)
  }

}
