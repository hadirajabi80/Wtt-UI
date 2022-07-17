import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { FilterType } from 'src/app/Models/login';
import { UserLoginTimeService } from 'src/app/Services/user-login-time.service';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {

  modalRef : NgbModalRef;
  startDate :string;
  endDate:string;
  dateStarted;
  dateEnded;
  filterType=FilterType;
  @Output() filterDate = new EventEmitter<any>();



  constructor(private modalService: NgbModal ,public userLoginTimeService:UserLoginTimeService) {}

  ngOnInit(): void {
  }
  open(content) {

    this.modalRef = this.modalService.open( content ,{size:'lg' , centered:true , backdrop:false})
  }

  datePickerConfig = {
    format:'jYYYY-jMM-jDD'
  }

  onShow()
  {
      var startDate= this.dateStarted;
      var endDate= this.dateEnded;    
      this.filterDate.emit({startDate,endDate});
        
  }
  onUpdateStartTime(e)
  {
    var startDate= moment(e).locale('en').format('YYYY-MM-DD');
    this.dateStarted= startDate;
  }
  onUpdateEndTime(e)
  {
    var endDate= moment(e).locale('en').format('YYYY-MM-DD');
    this.dateEnded= endDate;
  }
  onFilter(type,e)
  {    
    this.filterDate.emit({type});
  }
}
