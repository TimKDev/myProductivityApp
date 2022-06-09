import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clock'
})
export class ClockPipe implements PipeTransform {

  transform(value: number): string {
    let valueString = value.toString();
    if (valueString.length == 1) return '0' + valueString;
    return valueString;
  }

}
