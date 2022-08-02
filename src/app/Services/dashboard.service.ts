import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ResDashboard } from '../Models/login';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public resDashboard: ResDashboard;
  public resDashboardAdmin: ResDashboard;

  readonly taskUrl = 'https://localhost:7263/api/Dashboard';

  constructor(private http: HttpClient , private router:Router) {}

  getAll(date?) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const myObject: any = {
      type: date.type,
      startDate: date.startDate,
      endDate: date.endDate,
    };
    for (let prop of Object.keys(myObject)) {
      if (!myObject[prop]) delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };    
    return this.http.get<ResDashboard>(this.taskUrl, options)    
    .subscribe((res) => {  
      this.resDashboard=res;
    });
  }


  GetUserStatusByAdmin(userId , date?) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const myObject: any = {
      type: date.type,
      startDate: date.startDate,
      endDate: date.endDate,
      userId : userId
    };
    for (let prop of Object.keys(myObject)) {
      if (!myObject[prop]) delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };    
    return this.http.get<ResDashboard>(this.taskUrl+"/" + "Admin", options)
    .subscribe((res) => {      
      this.resDashboardAdmin=res;
    });
  }
}
