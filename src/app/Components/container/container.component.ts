import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginTimeService } from 'src/app/Services/user-login-time.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [],
})
export class ContainerComponent implements OnInit {

  constructor(public userLoginTimeService: UserLoginTimeService, private router:Router) {}
  ngOnInit(): void {

  }


  onExit()
  {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
