import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly rootURl = 'https://localhost:7263/api/Auth';
  readonly userUrl = 'https://localhost:7263/api/Users';
  constructor(private http: HttpClient) {}

  login(userName, password) {
    let loginObj = new Login(userName, password);
    return this.http.post(this.rootURl, loginObj);
  }
}
