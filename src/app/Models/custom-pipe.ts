import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "jalali-moment";

@Pipe({
    name: 'jalali'
  })
  export class JalaliPipe implements PipeTransform {
    transform(value: any, args?: any): any {
      let MomentDate = moment(value, 'YYYY/MM/DD');
      return MomentDate.locale('fa').format('YYYY/M/D');
    }
  }

  @Pipe({
    name: 'time'
  })
  export class TimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
      var hour = Math.floor(value/ 60);
      var min = value % 60;
      var time =
        String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0');
        return time;
    }
  }