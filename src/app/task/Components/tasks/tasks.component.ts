import { Component, OnInit, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/Services/task.service';
import * as moment from 'jalali-moment';
import { FilterType } from 'src/app/Models/login';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { TaskLocationService } from 'src/app/Services/task-location.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  text:string='';
  modalRef : NgbModalRef;
  dateObject;
  workTime:number;
  date;
  time="00:00";
  pageNumber:number=1;
  pageSize:number=10;
  searchKey: string = '';
  dateType :any = {type:FilterType.CURRENT_MONTH};
  description:string='';
  editStatus:boolean=false;
  userTask;
  type;
  project;  
  constructor(public taskService:TaskService ,
    private modalService: NgbModal , 
    private toastr:ToastrService,
    public taskLocationService:TaskLocationService,
    public projectService:ProjectService
     ) { }

  ngOnInit(): void {     
   this.taskService.getAll(this.searchKey,this.pageNumber,this.pageSize ,this.dateType);
   this.projectService.getProjects();
  }


  open(content) {

    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
  }
  onEdit(task, content)
  {   
    this.editStatus=true;
    this.userTask = this.taskService.tasks.find(p=>p.id == task.id);
    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
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
  datePickerConfig = {
    format:'jYYYY-jMM-jDD'
  }

  workTimeConfig={
    format:'HH:mm'
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
      this.taskService.addTask(this.text,this.description,workTime ,this.date , this.type , this.project)
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
        }
        else
        {
          this.toastr.error("تاریخ وارد شده اشتباه می باشد");
          return;
        }
      })
      }
  }
  errorHandler(err) { 
    this.toastr.error('تاریخ وارد شده اشتباه می باشد');
    return throwError(err);
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
  onChangeTable(e)
  {
    this.pageNumber=e;    
    this.taskService.getAll(this.searchKey ,this.pageNumber,this.pageSize,this.dateType);     
  }
  filterDate(date)
  {  
    this.dateType=date;
    this.taskService.getAll('',1,10,date)  
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
}
