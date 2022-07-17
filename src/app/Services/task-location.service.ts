import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskLocation } from '../Models/login';

@Injectable({
  providedIn: 'root'
})

export class TaskLocationService {

  readonly taskLocationUrl = 'https://localhost:7263/api/TaskLocations';

  locations:TaskLocation[];
  constructor(private http: HttpClient) { }
  getLocations() {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization','bearer ' + token);  

    return this.http.get<TaskLocation[]>(this.taskLocationUrl, {headers: headers})
    .subscribe((res) => {            
      this.locations = res;
    });
  }
}
