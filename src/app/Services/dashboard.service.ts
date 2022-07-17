import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResDashboard } from '../Models/login';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public resDashboard: ResDashboard;

  readonly taskUrl = 'https://localhost:7263/api/Dashboard';

  constructor(private http: HttpClient) {}

  getAll(date?) {
    let token = localStorage.getItem('token');
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
}
