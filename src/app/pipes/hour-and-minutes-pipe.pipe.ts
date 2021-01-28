import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../interfaces/activity.interfaces';

@Pipe({
  name: 'hym'
})
export class HourAndMinutesPipePipe implements PipeTransform {

  transform(value: Time): string {
    return value.hour + ':' + value.min;
  }

}
