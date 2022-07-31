import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { ChildInfo, Childs, Parents } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserParentService {

  readonly parentUrl = 'https://localhost:7263/api/UserParent';
  parent:Parents[];
  child:ChildInfo[];
  parentId;
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
      console.log(res);
                  
      this.parent = res;
    });
  }
  getChilds(id) {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { userId: id};    
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    
    const options = { params: new HttpParams(httpParams), headers:headers };  
    return this.http.get<Childs>(this.parentUrl +"/"+"Childs", options)
    .subscribe((res) => {
      if(res)
      {        
        this.child=res.child;
        this.parentId=res.parentId;
      }
      else
      {
        return null
      }
    });
  }
  deleteChild(childId)
  {
    let token = localStorage.getItem('token');

    return this.http
      .delete(this.parentUrl + '/' + childId, {headers: {Authorization: 'bearer ' + token,}});
  }
}
      
     
  
