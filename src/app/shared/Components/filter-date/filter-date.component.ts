import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { FilterType } from 'src/app/Models/login';
import { UserPresenceService } from 'src/app/Services/user-presence.service';

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
  filterName:string= 'ماه مالی جاری تا امروز' ;
  @Output() filterDate = new EventEmitter<any>();



  constructor(private modalService: NgbModal ,public userPresenceService:UserPresenceService) {}

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
  onFilter(type,val)
  {    
    this.filterName=val;        
    this.filterDate.emit({type});
  }
}
