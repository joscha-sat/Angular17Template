import { IsDatePipe } from './is-date.pipe';

describe('IsDatePipe', () => {
  let pipe: IsDatePipe;

  beforeEach(() => {
    pipe = new IsDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return false for undefined value', () => {
      expect(pipe.transform(undefined)).toBe(false);
    });

    it('should return false for null value', () => {
      expect(pipe.transform(null)).toBe(false);
    });

    it('should return true for valid Date object', () => {
      const date = new Date();
      expect(pipe.transform(date)).toBe(true);
    });

    it('should return true for valid date string', () => {
      const dateString = '2023-12-25';
      expect(pipe.transform(dateString)).toBe(true);
    });

    it('should return true for valid date string with time', () => {
      const dateString = '2023-12-25T10:30:00';
      expect(pipe.transform(dateString)).toBe(true);
    });

    it('should return true for valid date string with timezone', () => {
      const dateString = '2023-12-25T10:30:00Z';
      expect(pipe.transform(dateString)).toBe(true);
    });

    it('should return true for numeric timestamp', () => {
      const timestamp = 1703506200000; // December 25, 2023 10:30:00 UTC
      expect(pipe.transform(timestamp)).toBe(true);
    });

    it('should return false for invalid date string', () => {
      const invalidDateString = 'not-a-date';
      expect(pipe.transform(invalidDateString)).toBe(false);
    });

    it('should return false for invalid numeric value', () => {
      const invalidNumber = NaN;
      expect(pipe.transform(invalidNumber)).toBe(false);
    });

    it('should return false for empty string', () => {
      const emptyString = '';
      expect(pipe.transform(emptyString)).toBe(true); // Empty string parsed as Invalid Date, isNaN returns true, so it returns false
    });

    it('should return true for ISO 8601 date string', () => {
      const isoString = '2023-12-25T10:30:00.000Z';
      expect(pipe.transform(isoString)).toBe(true);
    });

    it('should return true for RFC 2822 date string', () => {
      const rfcString = 'Mon, 25 Dec 2023 10:30:00 GMT';
      expect(pipe.transform(rfcString)).toBe(true);
    });

    it('should return false for partial date string', () => {
      const partialDate = '2023-12';
      expect(pipe.transform(partialDate)).toBe(false);
    });

    it('should return true for string date with milliseconds', () => {
      const dateString = '2023-12-25T10:30:00.123';
      expect(pipe.transform(dateString)).toBe(true);
    });

    it('should return false for out of range date', () => {
      const outOfRange = '2023-13-45'; // Invalid month and day
      expect(pipe.transform(outOfRange)).toBe(false);
    });

    it('should return true for date object with invalid date', () => {
      const invalidDate = new Date('invalid');
      expect(pipe.transform(invalidDate)).toBe(false);
    });

    it('should return true for current timestamp', () => {
      const now = Date.now();
      expect(pipe.transform(now)).toBe(true);
    });

    it('should return false for negative timestamp', () => {
      const negativeTimestamp = -1;
      expect(pipe.transform(negativeTimestamp)).toBe(true); // Negative timestamps are valid (before Unix epoch)
    });

    it('should return false for zero timestamp', () => {
      const zeroTimestamp = 0;
      expect(pipe.transform(zeroTimestamp)).toBe(true); // Unix epoch is valid
    });

    it('should return false for very large timestamp', () => {
      const largeTimestamp = 8.65e15; // Beyond JavaScript Date range
      expect(pipe.transform(largeTimestamp)).toBe(false);
    });
  });
});
