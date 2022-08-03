import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectList } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  readonly projectUrl = 'https://localhost:7263/api/Projects';

  project:Project[];
  rowsCount:number;

  constructor(private http: HttpClient , private router:Router) { }
  getProjects() {
    let token = localStorage.getItem('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let exp= parseInt(expiry);    
    if(exp <= Math.floor(Date.now()/1000))
    {
      localStorage.clear();
      this.router.navigate(['/login'])
    } 
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);  

    return this.http.get<ProjectList>(this.projectUrl, {headers: headers})
    .subscribe((res) => {            
      this.project = res.projects;
      this.rowsCount = res.rows;
    });
  }
}
