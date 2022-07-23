import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }
  editUser;
  editStatus:boolean=false;
  ngOnInit(): void {
  }
  onEdit(e)
  {        
    this.editUser=e;    
  }
}
