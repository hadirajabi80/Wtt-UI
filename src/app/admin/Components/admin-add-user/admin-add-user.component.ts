import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterType, Register } from 'src/app/Models/login';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss']
})
export class AdminAddUserComponent implements OnInit {

  editStatus:boolean=false;
  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  roleId: number = 0;
  modalRef : NgbModalRef;
  pageNumber:number=1;
  pageSize:number=10;
  searchKey: string = '';

  constructor(    
    private modalService: NgbModal , 
    private toastr:ToastrService,
    public roleService : RoleService,
    public userService : UserService
    ) { }

  ngOnInit(): void {
    this.roleService.getRole();
    this.userService.getAll(this.searchKey,this.pageNumber,this.pageSize)    
  }

  open(content) {

    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
  }
  closeModal()
  {

  }
  onSave() {
    
    let registerObj = new Register(this.fullName, this.userName, this.email, this.password, this.roleId);
    this.userService
      .addUser(registerObj)
      .pipe(catchError(err => this.errorHandler(err))) 
      .subscribe((res) => {        
        if(res)
        {
          this.toastr.success('کاربر با موفقیت اضافه شد');
          this.modalService.dismissAll();
        }
        else
        {
          this.toastr.warning("اطلاعات را بررسی کنید");
        }
      });
  }
  errorHandler(err) { 
    this.toastr.error('کاربر اضافه نشد.');
    return throwError(err);
  }
}
