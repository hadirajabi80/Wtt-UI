import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService:LoginService){}

  private loggedIn:boolean=false;
  
  public isAuthenticate()
  {
    return new Promise((resolve , rejects)=>
    {

      let token = localStorage.getItem('token');
      let isValidToken: boolean = !!token;
      resolve(isValidToken)
    })
  }
  public checkAuth()
  {
    return this.loggedIn;
  }

  public login()
  {
    console.log(this.loginService.login);
    
  }

  public logout()
  {
    this.loggedIn=false;
  }
}
