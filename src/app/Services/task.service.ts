import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { ResTask, Tasks, Users, UserTask } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks:UserTask[];
  userTaskAdmin:UserTask[];
  rowsCount:number;
  users: Users[];
  readonly taskUrl = 'https://localhost:7263/api/UserTasks';

  constructor(private http: HttpClient , private router:Router) { }

  getAll(searchKey? , pageNumber?, pageSize? , date? , confirmedType? ,locationType?) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { searchKey: searchKey,
       pageNumber: pageNumber,
        pageSize: pageSize ,
        type:date.type ,
        startDate:date.startDate,
        endDate:date.endDate,
        confirmedType : confirmedType,
        locationType : locationType
      };
    
    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };
    return this.http.get<ResTask>(this.taskUrl ,options)
    .subscribe((res) => {              
      this.tasks = res.userTasks;
      this.rowsCount=res.rows;
    });
  }

  addTask(taskObj) : Observable<any>
  {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    return this.http.post(this.taskUrl,taskObj, {headers:headers});
  } 

  delete(id) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    return this.http
      .delete(this.taskUrl + '/' + id, {headers: headers})
      .subscribe((res) => {
        let index = this.tasks.findIndex((task) => task.id == id);

        if (index > -1) this.tasks.splice(index, 1);        
      });
  }
  edit (taskObj)
  {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    return this.http
      .put(this.taskUrl + '/' + taskObj.id, taskObj ,  {headers: headers});
  }
  getTaskByAdmin(searchKey? , pageNumber?, pageSize? , date? , userId? , confirmedType?,locationType? ) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { searchKey: searchKey,
       pageNumber: pageNumber,
        pageSize: pageSize ,
        type:date.type ,
        startDate:date.startDate,
        endDate:date.endDate ,
        userId:userId,
        confirmedType :confirmedType,
        locationType : locationType
        };
    
    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };
    return this.http.get<ResTask>(this.taskUrl +'/Admin' ,options)
    .subscribe((res) => {      
      this.userTaskAdmin = res.userTasks;
      this.rowsCount=res.rows;
    });
  }
  status(confirmType) {    
    let token = localStorage.getItem('token');
    return this.http
      .put(this.taskUrl + '/Admin/' + confirmType.id, confirmType, {
        headers: { Authorization: 'bearer ' + token },
      })
  }
}
