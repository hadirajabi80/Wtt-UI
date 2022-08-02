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

  constructor(public userPresenceService: UserPresenceService, private router:Router, public userService:UserService) {}
  ngOnInit(): void {
    this.userService.getAll();
  }


  onExit()
  {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
