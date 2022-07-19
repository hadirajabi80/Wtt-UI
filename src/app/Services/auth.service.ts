import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import jwt_decode from 'jwt-decode';

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
  public isAuthenticateAdmin()
  {
    return new Promise((resolve , rejects)=>
    {

      let token = localStorage.getItem('token');
      let decoded = jwt_decode(token);
      let isAdmin="1" === decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      let isValidToken: boolean = !!token;
      if(!isAdmin)
      {
        isValidToken=false;
      }      
      resolve(isValidToken)
    })
  }
  public checkAuth()
  {
    return this.loggedIn;
  }

  public logout()
  {
    this.loggedIn=false;
  }
}
