import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { FilterType, UserVacation } from 'src/app/Models/login';
import { UserVacationService } from 'src/app/Services/user-vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
  modalRef: NgbModalRef;
  dateObject;
  vacationDate: string;
  description: string;
  date;
  pageNumber: number = 1;
  pageSize: number = 10;
  dateType = { type: FilterType.CURRENT_MONTH };
  editStatus: boolean = false;
  userVacation;
  isConfirmed: boolean;
  constructor(
    private modalService: NgbModal,
    public userVacationService: UserVacationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userVacationService.getAll(
      '',
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
  }
  open(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'md',
      centered: true,
      backdrop: false,
    });
  }
  onEdit(vacation, content) {
    this.editStatus = true;
    this.userVacation = this.userVacationService.userVacations.find(
      (p) => (p.id == vacation.id)
    );    
    this.modalRef = this.modalService.open(content, {
      size: 'md',
      centered: true,
      backdrop: false,
    });
    this.description = this.userVacation.description;
    this.dateObject = moment(this.userVacation.date)
      .locale('fa')
      .format('jYYYY-jMM-jDD');
  }

  datePickerConfig = {
    format: 'jYYYY-jMM-jDD',
  };

  dateTimeConfig = {
    format: 'HH:mm',
  };

  onSave() {
    if (this.dateObject == null) {
      this.toastr.warning('لطفا زمان مرخصی را وارد کنید');
      return;
    }
    if (this.description == null) {
      this.toastr.warning('لطفا شرح مرخصی را وارد کنید');
      return;
    }
    if (this.editStatus == true) {
      if (this.userVacation == true) {
        this.toastr.warning('مرخصی بعد از تایید قابل ویرایش نیست');
        return;
      } else {
        let vacationObj = {id: this.userVacation.id,description: this.description,date: this.date,};
        let index = this.userVacationService.userVacations.findIndex((m) => m.id == this.userVacation.id);
        this.userVacationService.edit(vacationObj)
        .pipe(catchError(err => this.errorHandler(err)))
        .subscribe((res) => {
            this.userVacationService.userVacations[index] = res;
            this.modalService.dismissAll();
            this.toastr.success("مرخصی با موفقیت ویرایش شد")
            this.dateObject = moment(Date.now());
            this.editStatus = false;
            this.description = '';
        });;
      }
    } else {
      this.userVacationService.add(this.description, this.date)
      .subscribe((res) => {
        if(!res)
        {
          this.toastr.error("تاریخ وارد شده اشتباه می باشد")
        }
        else
        {
          this.userVacationService.userVacations.unshift(res);
          this.modalService.dismissAll();
          this.toastr.success("مرخصی با موفقیت اضافه شد")
          this.dateObject = moment(Date.now());
          this.description = null;
          this.vacationDate = null;
        }

      });;

    }
  }
  errorHandler(err) { 
    this.toastr.error('تاریخ وارد شده اشتباه می باشد');
    return throwError(err);
  }
  onUpdate(e) {
    var date = moment(e).locale('en').format('YYYY-MM-DD');
    this.date = date;
  }

  filterDate(date) {
    this.dateType = date;
    this.userVacationService.getAll('', 1, 10, date);
  }
  onChangeTable(e) {
    this.pageNumber = e;
    this.userVacationService.getAll(
      '',
      this.pageNumber,
      this.pageSize,
      this.dateType
    );
  }
  closeModal()
  {
    this.editStatus=false;
    this.dateObject=moment(Date.now());
    this.description='';
  }
}
