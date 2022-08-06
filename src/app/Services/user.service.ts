import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parents, ResUser, Users } from '../Models/login';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Users[];
  user: Users;
  rowsCount: number;
  roleId:number;
  parent;
  childs;
  userId;
  readonly userUrl = 'https://localhost:7263/api/Users';
  readonly userParentUrl = 'https://localhost:7263/api/Users/UserParent';
  constructor(private http: HttpClient , private router:Router) {}

  getAll(searchKey?, pageNumber?, pageSize?) {

    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    }   
    let decoded = jwt_decode(token);
    this.roleId = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];    
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);    
    const myObject: any = { searchKey: searchKey, pageNumber: pageNumber, pageSize: pageSize };

    for(let prop of Object.keys(myObject)){
      if(!myObject[prop])
        delete myObject[prop];
    }
    const httpParams: HttpParamsOptions = {
      fromObject: myObject,
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers:headers };

    return this.http.get<ResUser>(this.userUrl, options).subscribe((res) => {      
      this.users = res.users;
      this.rowsCount=res.rows;
      
    });
  }
  delete(id) {
    let token = localStorage.getItem('token');
    return this.http
      .delete(this.userUrl + '/' + id, {
        headers: { Authorization: 'bearer ' + token },
      })
      .subscribe((res) => {
        let index = this.users.findIndex((user) => user.id == id);

        if (index > -1) this.users.splice(index, 1);
      });
  }

  status(id) {
    let token = localStorage.getItem('token');
    let index = this.users.findIndex((user) => user.id == id);
    return this.http
      .put(
        this.userUrl + '/' + id,
        { isActive: !this.users[index].isActive },
        { headers: { Authorization: 'bearer ' + token } }
      )
      .subscribe((res) => {
        this.users[index].isActive = !this.users[index].isActive;
      });
  }
  edit(users) {
    let token = localStorage.getItem('token');
    return this.http
      .put(this.userUrl + '/' + users.id, users, {
        headers: { Authorization: 'bearer ' + token },
      });
  }
  addUser(registerObj) {     
    let token = localStorage.getItem('token');
    return this.http.post(this.userUrl, registerObj, {
      headers: { Authorization: 'bearer ' + token },
    });
  }
  addUserParent(parent) {
     
    let token = localStorage.getItem('token');
    return this.http.post(this.userParentUrl, parent, {
      headers: { Authorization: 'bearer ' + token },
    });
  }
}
