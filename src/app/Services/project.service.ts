import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  readonly projectUrl = 'https://localhost:7263/api/Projects';

  project:Project[];
  constructor(private http: HttpClient) { }
  getProjects() {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);  

    return this.http.get<Project[]>(this.projectUrl, {headers: headers})
    .subscribe((res) => {            
      this.project = res;
    });
  }
}
