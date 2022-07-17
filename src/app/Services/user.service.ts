import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResUser, Users } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Users[];
  user: Users;
  readonly userUrl = 'https://localhost:7263/api/Users';

  constructor(private http: HttpClient) {}

  getAll(searchKey?, pageNumber?, pageSize?) {

    
    let token = localStorage.getItem('token');
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
      console.log(res);
      
      this.users = res.users;
      
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
    let index = this.users.findIndex((user) => user.id == users.id);
    return this.http
      .put(this.userUrl + '/' + users.id, users, {
        headers: { Authorization: 'bearer ' + token },
      })
      .subscribe((res) => {
        this.users[index] = users;
      });
  }
  addUser(registerObj) { 
    let token = localStorage.getItem('token');
    return this.http.post(this.userUrl, registerObj, {
      headers: { Authorization: 'bearer ' + token },
    });
  }
}