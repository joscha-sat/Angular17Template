import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDate',
  standalone: true,
})
export class IsDatePipe implements PipeTransform {
  transform(value: any): boolean {
    return !isNaN(Date.parse(value));
  }
}
