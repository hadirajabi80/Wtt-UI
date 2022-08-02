import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddLoginTime, FilterDate, Presence, ResPresence, UserAddPresence } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserPresenceService {

  presence:Presence[];
  userPresenceAdmin:Presence[];
  lastState:Presence;
  rowsCount:number;
  filterDate:FilterDate[];
  readonly timeUrl = 'https://localhost:7263/api/UserPresence';

  constructor(private http: HttpClient) { }

  getAll(pageNumber?, pageSize? ,date?) {      
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { pageNumber: pageNumber, pageSize: pageSize ,type:date.type ,startDate:date.startDate,endDate:date.endDate};    
    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }        
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };       
     return this.http.get<ResPresence>(this.timeUrl, options)
    .subscribe((res) => {            
      this.presence = res.userPresence;
      this.rowsCount=res.rows;      
    });
  }
  delete(id)
  {
    let token = localStorage.getItem('token');

    return this.http
      .delete(this.timeUrl + '/' + id, {headers: {Authorization: 'bearer ' + token}})
      .subscribe((res) => {
        let index = this.presence.findIndex((time) => time.id == id);

        if (index > -1) this.presence.splice(index, 1);        
      });
  }
  add(type)
  {
    let token = localStorage.getItem('token');
    let loginObj= new AddLoginTime(type);
    return this.http.post(this.timeUrl,loginObj,{headers: {Authorization: 'bearer ' + token}})
    .subscribe((res)=>{      
    })
  }
  getUserLastStatus()
  {
    let token = localStorage.getItem('token');    
    return this.http.get<Presence>(this.timeUrl + '/'+'UserLastState', {headers: {Authorization: 'bearer ' + token}});
   
  }
  userAdd(startTime , endTime , date)
  {
    let token = localStorage.getItem('token');
    let loginObj= new UserAddPresence(startTime , endTime , date);
    return this.http.post(this.timeUrl +'/' + 'UserAdd',loginObj,{headers: {Authorization: 'bearer ' + token}});
  }
  edit(presenceObj) {        
    let token = localStorage.getItem('token');
    return this.http
      .put(this.timeUrl + '/' + presenceObj.id, presenceObj, {
        headers: { Authorization: 'bearer ' + token },
      })
  }
  
  getPresenceByAdmin(pageNumber?, pageSize? ,date? , userId?) {      
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { pageNumber: pageNumber, pageSize: pageSize ,type:date.type ,startDate:date.startDate,endDate:date.endDate , userId :userId};    
    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }        
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };       
     return this.http.get<ResPresence>(this.timeUrl + "/Admin", options)
    .subscribe((res) => {            
      this.userPresenceAdmin = res.userPresence;
      this.rowsCount=res.rows;      
    });
  }
}
