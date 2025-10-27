import {describe, expect, it} from 'vitest';

import {timeToGerman} from './timeToGerman';

describe('timeToGerman', () => {
  describe('exact hours', () => {
    it('should convert midnight (0:00) to "Zwölf Uhr"', () => {
      expect(timeToGerman(0, 0)).toBe('Zwölf Uhr');
    });

    it('should convert 1:00 to "Ein Uhr"', () => {
      expect(timeToGerman(1, 0)).toBe('Ein Uhr');
    });

    it('should convert 6:00 to "Sechs Uhr"', () => {
      expect(timeToGerman(6, 0)).toBe('Sechs Uhr');
    });

    it('should convert noon (12:00) to "Zwölf Uhr"', () => {
      expect(timeToGerman(12, 0)).toBe('Zwölf Uhr');
    });

    it('should convert 13:00 to "Ein Uhr"', () => {
      expect(timeToGerman(13, 0)).toBe('Ein Uhr');
    });

    it('should convert 23:00 to "Elf Uhr"', () => {
      expect(timeToGerman(23, 0)).toBe('Elf Uhr');
    });
  });

  describe('quarter past (15 minutes)', () => {
    it('should convert 6:15 to "Viertel nach sechs"', () => {
      expect(timeToGerman(6, 15)).toBe('Viertel nach sechs');
    });

    it('should convert 3:15 to "Viertel nach drei"', () => {
      expect(timeToGerman(3, 15)).toBe('Viertel nach drei');
    });

    it('should convert 12:15 to "Viertel nach zwölf"', () => {
      expect(timeToGerman(12, 15)).toBe('Viertel nach zwölf');
    });
  });

  describe('half past (30 minutes)', () => {
    it('should convert 3:30 to "Halb vier" (refers to next hour)', () => {
      expect(timeToGerman(3, 30)).toBe('Halb vier');
    });

    it('should convert 6:30 to "Halb sieben"', () => {
      expect(timeToGerman(6, 30)).toBe('Halb sieben');
    });

    it('should convert 11:30 to "Halb zwölf"', () => {
      expect(timeToGerman(11, 30)).toBe('Halb zwölf');
    });

    it('should convert 23:30 to "Halb zwölf"', () => {
      expect(timeToGerman(23, 30)).toBe('Halb zwölf');
    });
  });

  describe('quarter to (45 minutes)', () => {
    it('should convert 4:45 to "Viertel vor fünf"', () => {
      expect(timeToGerman(4, 45)).toBe('Viertel vor fünf');
    });

    it('should convert 6:45 to "Viertel vor sieben"', () => {
      expect(timeToGerman(6, 45)).toBe('Viertel vor sieben');
    });

    it('should convert 11:45 to "Viertel vor zwölf"', () => {
      expect(timeToGerman(11, 45)).toBe('Viertel vor zwölf');
    });
  });

  describe('minutes past (1-29 minutes, excluding 15)', () => {
    it('should convert 6:10 to "Zehn Minuten nach sechs"', () => {
      expect(timeToGerman(6, 10)).toBe('Zehn Minuten nach sechs');
    });

    it('should convert 3:05 to "Fünf Minuten nach drei"', () => {
      expect(timeToGerman(3, 5)).toBe('Fünf Minuten nach drei');
    });

    it('should convert 8:01 to "Eine Minute nach acht"', () => {
      expect(timeToGerman(8, 1)).toBe('Eine Minute nach acht');
    });

    it('should convert 2:20 to "Zwanzig Minuten nach zwei"', () => {
      expect(timeToGerman(2, 20)).toBe('Zwanzig Minuten nach zwei');
    });

    it('should convert 5:25 to "Fünfundzwanzig Minuten nach fünf"', () => {
      expect(timeToGerman(5, 25)).toBe('Fünfundzwanzig Minuten nach fünf');
    });
  });

  describe('minutes to (31-59 minutes, excluding 45)', () => {
    it('should convert 6:50 to "Zehn Minuten vor sieben"', () => {
      expect(timeToGerman(6, 50)).toBe('Zehn Minuten vor sieben');
    });

    it('should convert 4:55 to "Fünf Minuten vor fünf"', () => {
      expect(timeToGerman(4, 55)).toBe('Fünf Minuten vor fünf');
    });

    it('should convert 9:59 to "Eine Minute vor zehn"', () => {
      expect(timeToGerman(9, 59)).toBe('Eine Minute vor zehn');
    });

    it('should convert 7:40 to "Zwanzig Minuten vor acht"', () => {
      expect(timeToGerman(7, 40)).toBe('Zwanzig Minuten vor acht');
    });

    it('should convert 3:35 to "Fünfundzwanzig Minuten vor vier"', () => {
      expect(timeToGerman(3, 35)).toBe('Fünfundzwanzig Minuten vor vier');
    });
  });

  describe('edge cases', () => {
    it('should handle hour wrap-around at 23:50', () => {
      expect(timeToGerman(23, 50)).toBe('Zehn Minuten vor zwölf');
    });

    it('should handle hour wrap-around at 0:30', () => {
      expect(timeToGerman(0, 30)).toBe('Halb eins');
    });

    it('should handle 11:59', () => {
      expect(timeToGerman(11, 59)).toBe('Eine Minute vor zwölf');
    });
  });
});
