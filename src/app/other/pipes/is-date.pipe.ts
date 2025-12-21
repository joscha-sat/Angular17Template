import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDate',
  standalone: true,
})
export class IsDatePipe implements PipeTransform {
  transform(value: string | number | Date): boolean {
    return !isNaN(Date.parse(value as string));
  }
}
