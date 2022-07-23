import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { EditUser, FilterType, Register, Users } from 'src/app/Models/login';
import { RoleService } from 'src/app/Services/role.service';
import { UserParentService } from 'src/app/Services/user-parent.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss']
})
export class AdminAddUserComponent implements OnInit , OnChanges {

  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  roleId: number = 0;
  modalRef : NgbModalRef;
  pageNumber:number=1;
  pageSize:number=10;
  searchKey: string = '';
  editStatus:boolean=false;
  @ViewChild('content') content;
  constructor(    
    private modalService: NgbModal , 
    private toastr:ToastrService,
    public roleService : RoleService,
    public userService : UserService,
    
    ) { }
    @Input() editUser;
  ngOnChanges(changes: SimpleChanges): void {
    if(this.editUser)
    {
      this.editStatus=this.editUser.edit;
      this.open(this.content)
    }
  }

  ngOnInit(): void {
    this.roleService.getRole();
    this.userService.getAll(this.searchKey,this.pageNumber,this.pageSize);
  }

  open(content) {    
    if(!this.editStatus)
    {
      this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});    
    }
    else if(this.editStatus=true)
    {
      this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
      this.fullName=this.editUser.user.fullName;
      this.email = this.editUser.user.email;
      this.userName= this.editUser.user.userName;
      this.roleId= this.editUser.user.roleId;
    }    
  }
  closeModal()
  {
    this.userName='';
    this.fullName='';
    this.email='';
    this.roleId=0;
  }
  onSave() {
    let registerObj = new Register(this.fullName, this.userName, this.email, this.password, this.roleId);
    let edit=this.editUser.user;    
    let editUser = new EditUser(edit.id,this.fullName, this.userName, this.email,edit.isActive, this.password,this.roleId)
    let index = this.userService.users.findIndex((user) => user.id == this.editUser.user.id);
    if(!this.editStatus)
    {
      this.userService
        .addUser(registerObj)
        .pipe(catchError(err => this.errorHandler(err))) 
        .subscribe((res) => {                
          if(res)
          {
            this.toastr.success('کاربر با موفقیت اضافه شد');
            this.modalService.dismissAll();
            this.userName='';
            this.fullName='';
            this.email='';
            this.roleId=0;
          }
          else
          {
            this.toastr.warning("اطلاعات را بررسی کنید");
          }
        });
    }
    else if(this.editStatus)
    {
      this.userService.edit(editUser)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe((res) => {
        if(res)
        {
          this.toastr.success('کاربر با موفقیت ویرایش شد');
          this.modalService.dismissAll();
          this.userName='';
          this.fullName='';
          this.email='';
          this.roleId=0;
          this.editStatus=false;
          this.password='';
          this.userService.users[index] = res;
        }
        else
        {
          this.toastr.warning("اطلاعات را بررسی کنید");
        }            
      });

    }
  }
  errorHandler(err) { 
    this.toastr.error('کاربر اضافه نشد.');
    return throwError(err);
  }
}
