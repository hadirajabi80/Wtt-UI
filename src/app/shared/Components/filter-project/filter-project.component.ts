import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.scss']
})
export class FilterProjectComponent implements OnInit {

  constructor(public projectService :ProjectService) { }
  project;
  @Output()searchProject = new EventEmitter;
  ngOnInit(): void {
    this.projectService.getProjects()
  }
  onSearch()
  {
    let projectId = this.projectService.project.find(x=>x.name==this.project).id;
    this.searchProject.emit(projectId);
  }
}
