import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public userService:UserService) { }
  editUser;
  editStatus:boolean=false;
  ngOnInit(): void {
  }
  onEdit(e)
  {        
    this.editUser=e;    
  }
}
