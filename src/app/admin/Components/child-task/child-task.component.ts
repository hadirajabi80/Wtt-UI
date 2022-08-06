import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-child-task',
  templateUrl: './child-task.component.html',
  styleUrls: ['./child-task.component.scss']
})
export class ChildTaskComponent implements OnInit {

  public isShowed = true;
  type;
  showBtn:boolean=false;

  constructor(public taskService : TaskService , private toastr:ToastrService , private userService:UserService) { }
  @Input()task;

  ngOnInit(): void {
    if(this.task){
      this.type=this.task.confirmType;
    }
  }
  onSelect()
  {    
    this.showBtn =true;
  }
  onChangeType()
  {
    let index = this.taskService.userTaskAdmin.findIndex((m) => m.id == this.task.id);
    let status= {id: this.task.id, confirmType: this.type ,parentId :this.userService.userId };
    this.taskService.status(status)
    .subscribe((res) => {
        this.taskService.userTaskAdmin[index] = res;
        this.toastr.success("عملیات با موفقیت انجام شد")
        this.showBtn = false;
    });
  }

}
