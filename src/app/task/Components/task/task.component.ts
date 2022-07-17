import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'jalali-moment';
import { UserTask } from 'src/app/Models/login';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  time;
  @Input() task: UserTask;
  @Output() editTask = new EventEmitter<any>();
  regDate;
  public isShowed = true;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.onTime();
    this.regDate = moment(this.task.date).locale('fa').format('jYYYY-jMM-jDD');
  }
  onDelete(id) {
    this.taskService.delete(id);
  }
  onTime() {
    var hour = Math.floor(this.task.timeWork / 60);
    var min = this.task.timeWork % 60;
    var time =
      String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0');
    this.time = time;
  }
  onEdit() {
    this.editTask.emit(this.task);
  }
}
