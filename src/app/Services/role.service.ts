import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly roleUrl = 'https://localhost:7263/api/Roles';
  roles:Roles[];
  constructor(private http: HttpClient) { }
  getRole() {
    let token = localStorage.getItem('token');
    return this.http.get<Roles[]>(this.roleUrl, {headers: {Authorization: 'bearer ' + token,}}).subscribe((res) => {      
      this.roles = res;
    });
  }
}
