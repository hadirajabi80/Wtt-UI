import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserMissionService } from 'src/app/Services/user-mission.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-child-mission',
  templateUrl: './child-mission.component.html',
  styleUrls: ['./child-mission.component.scss']
})
export class ChildMissionComponent implements OnInit {

  public isShowed = true;
  type;
  showBtn:boolean=false;

  @Input() userMissions;

  constructor(public userMissionService:UserMissionService , private toastr:ToastrService , private userService:UserService) { }

  ngOnInit(): void {
    if(this.userMissions){
      this.type=this.userMissions.confirmType;
    }
  }
  onSelect()
  {    
    this.showBtn =true;
  }
  onChangeType()
  {
    let index = this.userMissionService.userMissionsAdmin.findIndex((m) => m.id == this.userMissions.id);
    let status= {id: this.userMissions.id, confirmType: this.type , parentId: this.userService.userId};
    this.userMissionService.status(status)
    .subscribe((res) => {
        this.userMissionService.userMissionsAdmin[index] = res;
        this.toastr.success("عملیات با موفقیت انجام شد")
        this.showBtn = false;
    });
  }

}
