import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDate',
  standalone: true,
})
export class IsDatePipe implements PipeTransform {
  private isValidDateValue(value: string | number | Date): boolean {
    const date: Date = new Date(value);

    // Check if the date is invalid
    if (Number.isNaN(date.getTime())) {
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
    const yearMonthPattern: RegExp = /^\d{4}-\d{1,2}$/;
    const yearOnlyPattern: RegExp = /^\d{4}$/;
    return yearMonthPattern.test(dateString) || yearOnlyPattern.test(dateString);
  }

  transform(value: string | number | Date | undefined | null): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    if (value === '') {
      return true; // Empty string should be considered valid (creates Invalid Date)
    }

    return this.isValidDateValue(value);
  }
}
