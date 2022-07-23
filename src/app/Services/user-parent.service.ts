import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Parents } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserParentService {

  readonly parentUrl = 'https://localhost:7263/api/UserParent';
  parent:Parents[];
  constructor(private http: HttpClient , private router:Router) { }
  getParents() {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 

    return this.http.get<Parents[]>(this.parentUrl, {headers: {Authorization: 'bearer ' + token,}})
    .subscribe((res) => {            
      this.parent = res;
    });
  }}
