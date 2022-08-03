import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterStatusType, FilterTaskLocation, FilterType } from 'src/app/Models/login';
import { ProjectService } from 'src/app/Services/project.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit , OnChanges {

  text:string='';
  dateObject;
  workTime:number;
  date;
  time="00:00";
  modalRef : NgbModalRef;
  description:string='';
  editStatus:boolean=false;
  userTask;
  dateType :any = {type:FilterType.CURRENT_MONTH_TODAY};
  project;
  task;
  type;
  confirmedType = FilterStatusType.GETALL
  taskLocation =FilterTaskLocation.GETALL;
  showHome:boolean =false;
  projectId;
  @Input() editTask;
  @ViewChild('content') content;

  datePickerConfig = {
    format:'jYYYY-jMM-jDD'
  }
  workTimeConfig={
    format:'HH:mm'
  }
  constructor(private modalService: NgbModal,
    public taskService:TaskService,
    private toastr:ToastrService,
    public projectService:ProjectService
    ) { }
  ngOnChanges(changes: SimpleChanges): void {    
      if(this.editTask)
      {
        this.editStatus=this.editTask.edit;
        this.open(this.content)
      }
  }
  ngOnInit(): void {
  }
  open(content) {
    
    if(!this.editStatus)
    {
      this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
    }
    else if(this.editStatus)
    {
      let task=this.editTask.task;
      this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
      this.editStatus=true;
      this.userTask = this.taskService.tasks.find(p=>p.id == task.id);
      this.description=this.userTask.description;
      this.text=this.userTask.text;
      this.workTime=this.userTask.timeWork;
      var hour=Math.floor(this.userTask.timeWork/60);
      var min = this.userTask.timeWork%60;
      var time = (String(hour).padStart(2 ,'0') +':'+(String(min).padStart(2,'0')));
      this.time=time;
      this.dateObject=moment(this.userTask.date).locale('fa').format('jYYYY-jMM-jDD');
      this.project = this.userTask.projectId;
      this.type = this.userTask.type;
    }
  }
  filterDate(date)
  {  
    this.dateType=date;
    this.taskService.getAll('',1,10,date ,this.confirmedType,this.taskLocation)  
  }
  closeModal()
  {
    this.editStatus=false;
    this.dateObject=moment(Date.now());
    this.workTime=null;
    this.editStatus=false;
    this.description='';
    this.text='';
    this.time="00:00";   
  }
    onUpdate(e)
  {
    var date= moment(e).locale('en').format('YYYY-MM-DD');
    this.date= date; 
  }
  onTime()
  {    
    var hour=Math.floor(this.workTime/60);
    var min = this.workTime%60;
    var time = (String(hour).padStart(2 ,'0') +':'+(String(min).padStart(2,'0')));
    this.time=time;
    if(!this.workTime)
    {
      this.time = "00:00";
    }
  }
  onSave()
  {
    var workTime=Number(this.workTime);    
    if(this.workTime == null)
    {
      this.toastr.warning('لطفا مدت زمان پروژه را وارد کنید');
      return;
    }
    if(this.workTime > 960 )
    {
      this.toastr.warning('حداکثر زمان شانزده ساعت میباشد');
      return;
    }
    if(this.text == '')
    {
      this.toastr.warning('لطفا عنوان وظیفه را وارد کنید');
      return;
    }
    if(this.dateObject == '')
    {
      this.toastr.warning('لطفا تاریخ وظیفه را وارد کنید');
      return;
    }
    if(this.description == '')
    {
      this.toastr.warning('لطفا توضیحات وظیفه را وارد کنید');
      return;
    }
    if(this.type == null)
    {
      this.toastr.warning('لطفا محل کار را وارد کنید');
      return;
    }
    if(this.project == null)
    {
      this.toastr.warning('لطفا پروژه وظیفه را وارد کنید');
      return;
    }

    if(this.editStatus==true){
      let taskObj={id:this.userTask.id, text:this.text , description:this.description ,timeWork:this.workTime, date:this.date ,projectId:this.project}
      let index = this.taskService.tasks.findIndex((task) => task.id == this.userTask.id);
      this.taskService.edit(taskObj)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe((res) => {    

          this.taskService.tasks[index]=res;
          this.modalService.dismissAll();
          this.dateObject=moment(Date.now());
          this.toastr.success("وظیفه با موفقیت ویرایش شد")
          this.workTime=null;
          this.editStatus=false;
          this.description='';
          this.text='';
          this.time="00:00"; 
          this.type=null;
          this.project=null; 
   });
    }    
    else
    {
      let taskObj = {text : this.text, description: this.description,timeWork : workTime ,date:this.date ,type: this.type , projectId: this.project}
      this.taskService.addTask(taskObj)
      .subscribe((res)=>{
        if(res)
        {          
          this.taskService.tasks.unshift(res);
          this.toastr.success("عملیات با موفقیت انجام شد")
          this.modalService.dismissAll();
          this.dateObject=moment(Date.now());
          this.workTime=null;
          this.editStatus=false;
          this.description='';
          this.text='';
          this.type=null;
          this.project=null;
          this.time="00:00"; 
        }
        else
        {
          this.toastr.error('پنجره زمانی نقض شده است.');
          return;
        }
      })
      }
  }
  errorHandler(err) { 
    this.toastr.error('پنجره زمانی نقض شده است.');
    return throwError(err);
  }
  filterStatus(type)
  {
    this.confirmedType =type;
    this.taskService.getAll('',1,10, this.dateType , type,this.taskLocation);
  }
  onShowHome()
  {
    this.showHome=!this.showHome;
    if (this.showHome) 
    {
      this.taskService.getAll('',1,10, this.dateType , this.confirmedType,FilterTaskLocation.HOME);
    }
    else
    {
      this.taskService.getAll('',1,10, this.dateType , this.confirmedType,FilterTaskLocation.GETALL)
    }
  }
  filterProject(projectId)
  {
    this.taskService.getAll('',1,10, this.dateType , this.confirmedType,this.taskLocation , projectId)
  }
}
