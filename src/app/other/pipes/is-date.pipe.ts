import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDate',
  standalone: true,
})
export class IsDatePipe implements PipeTransform {
  transform(value: string | number | Date | undefined | null): boolean {
    if (value === undefined || value === null) {
      return false;
    }
    return !isNaN(Date.parse(value as string));
  }
}
