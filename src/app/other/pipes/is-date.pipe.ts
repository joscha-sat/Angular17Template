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
      return true; // Empty string should be considered valid (creates Invalid Date)
    }

    const date = new Date(value);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return false;
    }

    // Additional check for partial dates (like '2023-12' which defaults to first day of month)
    if (typeof value === 'string' && this.isPartialDate(value)) {
      return false;
    }

    return true;
  }

  private isPartialDate(dateString: string): boolean {
    // Check if date string has only year and month, or only year
    const yearMonthPattern = /^\d{4}-\d{1,2}$/;
    const yearOnlyPattern = /^\d{4}$/;
    return (
      yearMonthPattern.test(dateString) || yearOnlyPattern.test(dateString)
    );
  }
}
