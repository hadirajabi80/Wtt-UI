import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  FilterDate,
  ResVacation,
  UserAddVacation,
  Users,
  UserVacation,
} from '../Models/login';

@Injectable({
  providedIn: 'root',
})
export class UserVacationService {
  userVacations: UserVacation[];
  userVacationsAdmin : UserVacation[];
  rowsCount: number;
  users: Users[];
  filterDate: FilterDate[];
  readonly vacationUrl = 'https://localhost:7263/api/UserVacations';

  constructor(private http: HttpClient , private router:Router) {}

  getAll(searchKey?, pageNumber?, pageSize?, date? , confirmedType?) {
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
      searchKey: searchKey,
      pageNumber: pageNumber,
      pageSize: pageSize,
      type: date.type,
      startDate: date.startDate,
      endDate: date.endDate,
      confirmedType : confirmedType
    };

    for (let prop of Object.keys(myObject)) {
      if (!myObject[prop]) delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.http
      .get<ResVacation>(this.vacationUrl, options)
      .subscribe((res) => {        
        this.userVacations = res.userVacations;
        this.rowsCount = res.rows;
      });
  }

  add(description, date) {
    let token = localStorage.getItem('token');
    let vacationObj = new UserAddVacation(description, date);

    return this.http
      .post(this.vacationUrl, vacationObj, {
        headers: { Authorization: 'bearer ' + token },
      });
  }

  delete(id) {
    let token = localStorage.getItem('token');

    return this.http
      .delete(this.vacationUrl + '/' + id, {
        headers: { Authorization: 'bearer ' + token }})
      .subscribe((res) => {
        let index = this.userVacations.findIndex((m) => m.id == id);

        if (index > -1) this.userVacations.splice(index, 1);
      });
  }
  edit(vacationObj) {    
    let token = localStorage.getItem('token');
    return this.http
      .put(this.vacationUrl + '/' + vacationObj.id, vacationObj, {
        headers: { Authorization: 'bearer ' + token },
      })
  }
  getVacationsByAdmin(searchKey?, pageNumber?, pageSize?, date? , userId? , confirmedType?) {
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
      searchKey: searchKey,
      pageNumber: pageNumber,
      pageSize: pageSize,
      type: date.type,
      startDate: date.startDate,
      endDate: date.endDate,
      userId : userId,
      confirmedType :confirmedType
    };
    for (let prop of Object.keys(myObject)) {
      if (!myObject[prop]) delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.http
      .get<ResVacation>(this.vacationUrl + '/Admin', options)
      .subscribe((res) => {
        this.userVacationsAdmin = res.userVacations;
        this.rowsCount = res.rows;
      });
  }
  status(confirmType) {    
    let token = localStorage.getItem('token');
    return this.http
      .put(this.vacationUrl + '/Admin/' + confirmType.id, confirmType, {
        headers: { Authorization: 'bearer ' + token },
      })
  }
}
function jwt_decode(token: string) {
  throw new Error('Function not implemented.');
}

