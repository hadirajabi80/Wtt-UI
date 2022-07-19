import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parents } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserParentService {

  readonly parentUrl = 'https://localhost:7263/api/UserParent';
  parent:Parents[];
  constructor(private http: HttpClient) { }
  getParents() {
    let token = localStorage.getItem('token');


    return this.http.get<Parents[]>(this.parentUrl, {headers: {Authorization: 'bearer ' + token,}})
    .subscribe((res) => {            
      this.parent = res;
    });
  }}
