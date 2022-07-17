import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'jalali-moment';
import { DatePickerComponent as JalaliDatePickerComponent } from 'ng2-jalali-date-picker';
import { DateDisplayFormat, DateMode, DateOutputType } from './DateFormat';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, OnDestroy {
  datePickerConfig: any;
  tempDate: any;
  _date: any = null;
  _fullDate = null;

  @Input() mode: any = DateMode.day;
  @Input() outputType: string = DateOutputType.dateTime;
  @Input() displayFormat = DateDisplayFormat.shamsiDateTime;
  @Input() plholder = '';
  @Input() size: any = { width: '100%', height: '100%' };
  @Input() disableKeypress = true;
  @Input() showTodayDate = false;
  @Input() disabled = false;
  @Output() dateChanged: EventEmitter<any> = new EventEmitter();
  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Input() showDatePicker = false;

  @ViewChild('dpDatePicker', { static: false })
  dpDatePicker: JalaliDatePickerComponent;

  @Input() set date(value: any) {
    this.tempDate = value;
    this._fullDate = value;
    this.setDate();
  }

  constructor() { }

  ngOnInit(): void {
    this.datePickerConfig = {
      format: this.displayFormat,
      disableKeypress: this.disableKeypress,
      showTwentyFourHours: true,
      showSeconds: true,

    };

    if (this.showDatePicker) {
      setTimeout(() => this.dpDatePicker.api.open(), 200);
    }
  }

  setDate(): void {
    if (this.showTodayDate) {
      const todayDate = moment(new Date())
        .locale('fa')
        .format(DateDisplayFormat.shamsiDate);
      this._date = moment(todayDate, DateDisplayFormat.shamsiDate);
      return;
    }

    if (this.tempDate) {
      const d = new Date(this.tempDate);
      const date = moment(d)
        .locale('fa')
        .format(DateDisplayFormat.shamsiDateTime);
      this._date = moment(date, DateDisplayFormat.shamsiDateTime);
    }
  }

  updateValue(date: Date): void {
    let output: any;
    if (!date) {
      this.dateChanged.emit('');
      return;
    }

    switch (this.outputType) {
      case DateOutputType.shamsiDate:
        output = moment(date).locale('fa').format(DateDisplayFormat.shamsiDate);
        break;

      case DateOutputType.shamsiDateTime:
        output = moment(date)
          .locale('fa')
          .format(DateDisplayFormat.shamsiDateTime);
        break;

      case DateOutputType.dateTime:
        output = moment(date).locale('en').format(DateDisplayFormat.dateTime);
        break;

      case DateOutputType.dateTimeDash:
        output = moment(date)
          .locale('en')
          .format(DateDisplayFormat.dateTimeDash);
        break;

      case DateOutputType.date:
        output = moment(date).locale('en').format(DateDisplayFormat.date);
        break;

      case DateOutputType.dateRunFormat:
        output = moment(date).locale('fa').format(DateDisplayFormat.shamsiDate);
        break;

      case DateOutputType.dateTimeRunFormat:
        output = moment(date)
          .locale('fa')
          .format(DateDisplayFormat.shamsiDateTime);
        break;

      case DateOutputType.utc:
        output = moment.utc(date).valueOf();
        break;
    }
    this.dateChanged.emit(output);
  }

  onCloseDatePicker(): void {
    this.closed.emit();
  }


  ngOnDestroy(): void {
    this.dpDatePicker.api.close();
  }
}
