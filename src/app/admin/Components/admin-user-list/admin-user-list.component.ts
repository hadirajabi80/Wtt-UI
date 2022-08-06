import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterType, Parents } from 'src/app/Models/login';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { UserParentService } from 'src/app/Services/user-parent.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  public isShowed = true;
  pageNumber: number = 1;
  pageSize: number = 10;
  searchKey: string = '';
  modalRef : NgbModalRef;
  parentId:number=0;
  childId:number=0;
  userId:number;
  parent;
  user;
  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};
  @Output() editUser = new EventEmitter<any>();

  constructor(public userService:UserService,
    private modalService: NgbModal ,
     public toastr:ToastrService ,
      public userParent:UserParentService,
      public dashboardService :DashboardService,
      private router :Router
      ) { }

  ngOnInit(): void {
  }
  onDelete(id) {
    this.userService.delete(id);
  }
  onChangeTable(e) {
    this.pageNumber = e;
    this.userService.getAll(
      this.searchKey,
      this.pageNumber,
      this.pageSize,
    );
  }
  onEdit(user) {
    let edit=true;   
    this.editUser.emit({user,edit});
  }
  onUser(id,content)
  {
    this.userId=id;    
    this.userParent.getChilds(id);
    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});    
    
  }
  onActive(id) {
    return this.userService.status(id);
  }
  onSearch()
  {
    this.userService.getAll(this.searchKey , this.pageNumber , this.pageSize);
  }
  onSave()
  {
    let parentObj = new Parents(this.userId,this.parentId);    
    this.userService.addUserParent(parentObj)
    .pipe(catchError(err=>this.errorHandler(err)))
    .subscribe((res)=>{      
      if(res)
      {          
        this.toastr.success("عملیات با موفقیت انجام شد")
        this.modalService.dismissAll();
        this.parentId=0;
      }
      else
      {
        this.toastr.error("کاربر قبلا به مدیر انتخابی اضافه شده است");
      }
    })
  }
  errorHandler(err) { 
    this.toastr.error("کاربر نمیتواند در زیرمجموعه خودش قرار گیرد.");
    return throwError(err);
  }
  onDeleteChild()
  {        
    this.userParent.deleteChild(this.childId)
    .subscribe((res) => {
      if(res==true)
      {
     
        let index = this.userParent.child.findIndex(x=>x.id==this.childId);                
        if (index > -1) this.userParent.child.splice(index, 1); 
        this.toastr.success("کاربر با موفقیت حذف شد");
        this.modalService.dismissAll();
        this.childId=0;
      }      
      else
      {
        this.toastr.error("کاربر حذف نشد")
      }
    });
  }
  onClose()
  {
    this.childId=0
    this.parentId=0;
  }
}
