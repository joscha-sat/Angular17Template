import { Injectable } from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root',
})
export class DateConverterService {
  // from Tui DateTime to Iso IsoDate
  formatTaigaDateToIsoDate(data: [TuiDay, TuiTime?], start = true) {
    const [tuiDay, tuiTime] = data;

    let date;

    if (tuiTime != null) {
      date = new Date(
        Date.UTC(
          tuiDay.year,
          tuiDay.month,
          tuiDay.day,
          tuiTime.hours,
          tuiTime.minutes,
          tuiTime.seconds,
        ),
      );
    } else if (start) {
      date = new Date(Date.UTC(tuiDay.year, tuiDay.month, tuiDay.day, 0, 0, 0)); // start of the day, default
    } else {
      date = new Date(
        Date.UTC(tuiDay.year, tuiDay.month, tuiDay.day, 23, 59, 59),
      ); // end of the day, if boolean set to false
    }

    return date.toISOString();
  }

  // from IsoDate to Tui DateTime
  formatIsoDateToTaigaDate(isoDate: string): [TuiDay, TuiTime] {
    const date = new Date(isoDate); // Construct a Date from ISO string

    // Generate the time object
    const time = new TuiTime(
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );

    // Format the date part as TuiDay
    const tuiDay: TuiDay = new TuiDay(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );

    return [tuiDay, time];
  }

  // Format different date outputs depending on some conditions

  formatDaySameMonthYear(start: Date, end: Date, locale: string): string {
    const dayOptions: Intl.DateTimeFormatOptions = { day: 'numeric' };
    const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
    const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };

    const isSameDay = start.getDate() === end.getDate();

    const startDayFormatter = new Intl.DateTimeFormat(
      locale,
      isSameDay
        ? { ...dayOptions, ...monthOptions, ...yearOptions }
        : dayOptions,
    );

    const endDayMonthYearFormatter = new Intl.DateTimeFormat(locale, {
      ...dayOptions,
      ...monthOptions,
      ...yearOptions,
    });

    if (isSameDay) {
      return `${startDayFormatter.format(start)}`;
    }

    return `${startDayFormatter.format(start)} - ${endDayMonthYearFormatter.format(end)}`;
  }

  formatDayMonthSameYear(start: Date, end: Date, locale: string): string {
    const dayMonthOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };

    const startFormatter = new Intl.DateTimeFormat(locale, dayMonthOptions);
    const endFormatter = new Intl.DateTimeFormat(locale, {
      ...dayMonthOptions,
      ...yearOptions,
    });

    return `${startFormatter.format(start)} - ${endFormatter.format(end)}`;
  }

  formatDayMonthYear(start: Date, end: Date, locale: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const startFormatter = new Intl.DateTimeFormat(locale, options);
    const endFormatter = new Intl.DateTimeFormat(locale, options);

    return `${startFormatter.format(start)} - ${endFormatter.format(end)}`;
  }

  formatDateStringRange(
    startDate: Date | string,
    endDate: Date | string,
    locale = 'de',
  ) {
    const start = new Date(startDate);
    start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
    const end = new Date(endDate);
    end.setMinutes(end.getMinutes() + end.getTimezoneOffset());

    const isSameYear = start.getFullYear() === end.getFullYear();
    const isSameMonth = start.getMonth() === end.getMonth();

    if (isSameYear && isSameMonth) {
      return this.formatDaySameMonthYear(start, end, locale);
    } else if (isSameYear) {
      return this.formatDayMonthSameYear(start, end, locale);
    } else {
      return this.formatDayMonthYear(start, end, locale);
    }
  }

  isBetweenTimes(
    dateToCheck: string,
    dateFrom: string,
    dateTo: string,
  ): boolean {
    // Convert ISO dates to Date objects
    const check = new Date(dateToCheck);
    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    // Adjust for timezone offset
    from.setMinutes(from.getMinutes() - 120);
    to.setMinutes(to.getMinutes() - 120);

    // Extract time parts
    const [checkHour, checkMin] = [check.getHours(), check.getMinutes()];
    const [fromHour, fromMin] = [from.getHours(), from.getMinutes()];
    const [toHour, toMin] = [to.getHours(), to.getMinutes()];

    // Represent times in minutes past midnight for easier comparison
    const checkInMinutes = checkHour * 60 + checkMin;
    const fromInMinutes = fromHour * 60 + fromMin;
    const toInMinutes = toHour * 60 + toMin;

    // Check if the time to be checked falls between the other two times
    if (fromInMinutes <= toInMinutes) {
      // Normal case (e.g., from 10:00 to 18:00)
      return checkInMinutes >= fromInMinutes && checkInMinutes <= toInMinutes;
    } else {
      // Special case (e.g., from 22:00 to 02:00)
      return checkInMinutes >= fromInMinutes || checkInMinutes <= toInMinutes;
    }
  }
}
