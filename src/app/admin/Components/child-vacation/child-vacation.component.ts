import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserVacationService } from 'src/app/Services/user-vacation.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-child-vacation',
  templateUrl: './child-vacation.component.html',
  styleUrls: ['./child-vacation.component.scss']
})
export class ChildVacationComponent implements OnInit{

  public isShowed = true;
  @Input() userVacation;
  type;
  showBtn:boolean=false;
  constructor(
    public userVacationService:UserVacationService,
    private toastr:ToastrService,
    private userService : UserService
    ) { }
  ngOnInit(): void {
    if(this.userVacation){
      this.type=this.userVacation.confirmType;
    }
  }
  onSelect()
  {    
    this.showBtn =true;
  }
  onChangeType()
  {
    let index = this.userVacationService.userVacationsAdmin.findIndex((m) => m.id == this.userVacation.id);
    let status= {id: this.userVacation.id, confirmType: this.type , parentId: this.userService.userId};
    this.userVacationService.status(status)
    .subscribe((res) => {
        this.userVacationService.userVacationsAdmin[index] = res;
        this.toastr.success("عملیات با موفقیت انجام شد")
        this.showBtn = false;
    });
  }
}
