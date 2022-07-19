import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Parents } from 'src/app/Models/login';
import { UserParentService } from 'src/app/Services/user-parent.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  pageNumber: number = 1;
  pageSize: number = 10;
  searchKey: string = '';
  @Output() editUser = new EventEmitter<any>();
  modalRef : NgbModalRef;
  parentId:number=0;
  userId:number;
  constructor(public userService:UserService,private modalService: NgbModal) { }

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
  onEdit(presence) {
    this.editUser.emit(presence);
  }
  onUser(id,content)
  {
    this.userId=id;
    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});

  }
  onSearch()
  {
    this.userService.getAll(this.searchKey , this.pageNumber , this.pageSize);
  }
  onSave()
  {
    let parentObj = new Parents(this.parentId,this.userId);

    this.userService.addUserParent(parentObj)
    .subscribe((res)=>
    {
      console.log(res);
    })
  }
}
