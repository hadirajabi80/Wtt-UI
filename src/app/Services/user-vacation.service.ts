import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilterDate,
  ResVacation,
  UserAddMission,
  UserAddVacation,
  Users,
  UserVacation,
} from '../Models/login';

@Injectable({
  providedIn: 'root',
})
export class UserVacationService {
  userVacations: UserVacation[];
  rowsCount: number;
  users: Users[];
  filterDate: FilterDate[];
  readonly vacationUrl = 'https://localhost:7263/api/UserVacations';

  constructor(private http: HttpClient) {}

  getAll(searchKey?, pageNumber?, pageSize?, date?) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const myObject: any = {
      searchKey: searchKey,
      pageNumber: pageNumber,
      pageSize: pageSize,
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
}
