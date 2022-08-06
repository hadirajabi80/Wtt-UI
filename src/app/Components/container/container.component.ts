import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPresenceService } from 'src/app/Services/user-presence.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [],
})
export class ContainerComponent implements OnInit {

  constructor( private router:Router, public userService:UserService) {}
  ngOnInit(): void {
    if(this.userService.roleId!=1)
    {
      this.userService.getAll();
    }
  }


  onExit()
  {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
