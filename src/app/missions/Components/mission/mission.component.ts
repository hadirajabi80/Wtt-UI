import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterType } from 'src/app/Models/login';
import { UserMissionService } from 'src/app/Services/user-mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  modalRef : NgbModalRef;
  dateObject;
  missionDate:string;
  title:string;
  location:string;
  description:string;
  date;
  pageNumber:number=1;
  pageSize:number=10;
  dateType = {type:FilterType.CURRENT_MONTH};
  editStatus:boolean=false;
  userMission;
  constructor(private modalService: NgbModal , public userMissionService : UserMissionService , private toastr:ToastrService  ) {}

  ngOnInit(): void {
    this.userMissionService.getAll('',this.pageNumber,this.pageSize ,this.dateType);     
  }
  open(content) {

    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false})
  }
  onEdit(mission, content)
  {   
    this.editStatus=true;
    this.userMission = this.userMissionService.userMissions.find(p=>p.id == mission.id);
    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
    this.description=this.userMission.description;
    this.location=this.userMission.location;
    this.title=this.userMission.title;
    this.dateObject=moment(this.userMission.date).locale('fa').format('jYYYY-jMM-jDD')  
  }

  datePickerConfig = {
    format:'jYYYY-jMM-jDD'
  }

  dateTimeConfig={
    format:'HH:mm'
  }

  onSave()
  {    
    if(this.date == null)
    {
      this.toastr.warning('لطفا زمان ماموریت را وارد کنید');
      return;
    }
    if(this.title == null)
    {
      this.toastr.warning('لطفا عنوان ماموریت را وارد کنید');
      return;
    }
    if(this.location == null)
    {
      this.toastr.warning('لطفا محل ماموریت را وارد کنید');
      return;
    }
    if(this.description == null)
    {
      this.toastr.warning('لطفا شرح ماموریت را وارد کنید');
      return;
    }
    if(this.editStatus==true){
      let missionObj={id:this.userMission.id , title:this.title , location:this.location , description:this.description , date:this.date}
      let index = this.userMissionService.userMissions.findIndex((m) => m.id == this.userMission.id);
      this.userMissionService.edit(missionObj)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe((res) => {
          this.userMissionService.userMissions[index]=res;
          this.modalService.dismissAll();
          this.dateObject=moment(Date.now());
          this.toastr.success("ماموریت با موفقیت ویرایش شد")
          this.location='';
          this.editStatus=false;
          this.description='';
          this.title='';
   });      
    }
    else{
      this.userMissionService.add(this.title,this.location , this.description , this.date)
      .subscribe((res)=>{ 
        if(!res)
        {
          this.toastr.error("تاریخ وارد شده اشتباه می باشد");
          return;
        }
        else
        {
          this.userMissionService.userMissions.unshift(res);
          this.modalService.dismissAll();
          this.toastr.success("ماموریت با موفقیت ثبت شد")
          this.dateObject=moment(Date.now());
          this.title=null;
          this.location=null;
          this.description=null;
          this.missionDate=null;
        }       
      });;
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

  filterDate(date)
  { 
    this.dateType=date;        
    this.userMissionService.getAll('',1,10,date)  
  }
  onChangeTable(e)
  {    
    this.pageNumber=e;
    this.userMissionService.getAll('',this.pageNumber,this.pageSize,this.dateType);  
  }
  closeModal()
  {
    this.editStatus=false;
    this.dateObject=moment(Date.now());
    this.description='';
    this.title='';
    this.location='';
  }
}
