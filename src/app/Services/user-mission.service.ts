import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FilterDate, ResMission, UserAddMission, UserMission, Users } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserMissionService {

  userMissions:UserMission[];
  rowsCount:number;
  users: Users[];
  filterDate:FilterDate[];
  readonly missionUrl = 'https://localhost:7263/api/UserMissions';

  constructor(private http: HttpClient , private router:Router) { }

  getAll(searchKey? , pageNumber?, pageSize? , date?) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { searchKey: searchKey, pageNumber: pageNumber, pageSize: pageSize,type:date.type ,startDate:date.startDate,endDate:date.endDate  };
    
    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }    
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };

    return this.http.get<ResMission>(this.missionUrl ,options)
    .subscribe((res) => {        
      this.userMissions = res.userMissions;
      this.rowsCount=res.rows;               
    });
  }

  add(title , location , description ,date)
  {    
    let token = localStorage.getItem('token');
    let missionObj= new UserAddMission(title , location , description , date);
    return this.http.post(this.missionUrl,missionObj,{headers: {Authorization: 'bearer ' + token,}});
  } 


  delete(id) {
    let token = localStorage.getItem('token');

    return this.http
      .delete(this.missionUrl + '/' + id, {headers: {Authorization: 'bearer ' + token,}})
      .subscribe((res) => {
        let index = this.userMissions.findIndex((m) => m.id == id);

        if (index > -1) this.userMissions.splice(index, 1);        
      });
  }
  edit (missionObj)
  {    
    let token = localStorage.getItem('token');
    return this.http
      .put(this.missionUrl + '/' + missionObj.id , missionObj ,  {headers: {Authorization: 'bearer ' + token,}});
  }
}

