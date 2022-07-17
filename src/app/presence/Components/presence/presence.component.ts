import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterType } from 'src/app/Models/login';
import { UserLoginTimeService } from 'src/app/Services/user-login-time.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  modalRef : NgbModalRef;
  dateObject;
  dateTimeStart:string;
  dateTimeEnd:string;
  date;
  startDateFilter:string='';
  endDateFilter:string='';
  editStatus:boolean=false;
  dateType :any = {type:FilterType.CURRENT_MONTH};
  presence;
  constructor(private modalService: NgbModal ,public userLoginTimeService:UserLoginTimeService , private toastr:ToastrService) {}

  ngOnInit(): void {
  }
  open(content) {

    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false})
  }
  onEdit(presence, content)
  {   
    this.editStatus=true;
    this.presence = this.userLoginTimeService.times.find(p=>p.id == presence.id);
    this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});
    let start=new Date(this.presence.startTime*1000);
    let end=new Date(this.presence.endTime*1000);
    this.dateTimeStart =start.getHours().toLocaleString()+":"+start.getMinutes().toLocaleString();
    this.dateTimeEnd=end.getHours().toLocaleString()+":"+end.getMinutes().toLocaleString();
    this.dateObject=moment(this.presence.date).locale('fa').format('jYYYY-jMM-jDD');
  }

  datePickerConfig = {
    format:'jYYYY-jMM-jDD'
  }

  dateTimeConfig={
    format:'HH:mm'
  }

  onSave()
  {
    
    if(this.dateTimeStart == null)
    {
      this.toastr.warning('لطفا زمان ورود را وارد کنید');
      return;
    }
    if(this.dateTimeEnd != null)
    {      
      var re=/:/gi;
      if(Number(this.dateTimeEnd.replace(re,''))-Number(this.dateTimeStart.replace(re,'')) <=0 )
      {
        this.toastr.warning('ساعت خروج باید قبل از ساعت ورود باشد')
        return;
      }
    }
    if(this.editStatus==true){
      let presenceObj = {id: this.presence.id,startTime: this.dateTimeStart,endTime:this.dateTimeEnd,date: this.date};
      let index = this.userLoginTimeService.times.findIndex((m) => m.id == presenceObj.id);
      this.userLoginTimeService.edit(presenceObj)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe((res) => {
        this.userLoginTimeService.times[index]=res;
        this.modalService.dismissAll();
        this.dateObject=moment(Date.now());
        this.toastr.success("حضور با موفقیت ویرایش شد")
        this.dateTimeStart=null;
        this.editStatus=false;
        this.dateTimeEnd='';
      });
    }
    else{
      this.userLoginTimeService.userAdd(this.dateTimeStart , this.dateTimeEnd ,this.date)
        .subscribe((res)=>{
          this.userLoginTimeService.times.unshift(res);
          this.modalService.dismissAll();
          this.toastr.success("حضور با موفقیت ثبت شد")
          this.dateObject=moment(Date.now());
          this.dateTimeStart=null;
          this.dateTimeEnd=null;  
        });
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
    this.userLoginTimeService.getAll(1,10,date)  
  }

}


