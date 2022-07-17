import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResTask, Tasks, Users, UserTask } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks:UserTask[];
  rowsCount:number;
  users: Users[];


  readonly taskUrl = 'https://localhost:7263/api/UserTasks';

  constructor(private http: HttpClient) { }

  getAll(searchKey? , pageNumber?, pageSize? , date?) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { searchKey: searchKey, pageNumber: pageNumber, pageSize: pageSize ,type:date.type ,startDate:date.startDate,endDate:date.endDate};
    
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

  addTask(text ,description, timeWork ,date,type ,projectId)
  {
        
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    let taskObj= new Tasks(text,description , timeWork , date ,type ,projectId);    
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
}
