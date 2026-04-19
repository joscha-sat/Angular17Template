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

    if (value === '') {
      return true;
    }

    const date: Date = new Date(value);

    if (isNaN(date.getTime())) {
      return false;
    }

    if (typeof value === 'string' && this.isPartialDate(value)) {
      return false;
    }

    return true;
  }

  private isPartialDate(dateString: string): boolean {
    const yearMonthPattern: RegExp = /^\d{4}-\d{1,2}$/;
    const yearOnlyPattern: RegExp = /^\d{4}$/;
    return (
      yearMonthPattern.test(dateString) || yearOnlyPattern.test(dateString)
    );
  }
}
