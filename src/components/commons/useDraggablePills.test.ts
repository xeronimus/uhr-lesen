import {describe, expect, it} from 'vitest';

import {appendToArray, insertAtPosition, removeOneInstance, reorderWithinArray} from './useDraggablePills';

describe('useDraggablePills - Pure Functions', () => {
  describe('removeOneInstance', () => {
    it('should remove only the first occurrence of a word', () => {
      const array = ['hello', 'world', 'hello', 'test'];
      const result = removeOneInstance(array, 'hello');

      expect(result).toEqual(['world', 'hello', 'test']);
    });

    it('should return the same array if word is not found', () => {
      const array = ['hello', 'world'];
      const result = removeOneInstance(array, 'missing');

      expect(result).toEqual(['hello', 'world']);
    });

    it('should handle empty array', () => {
      const array: string[] = [];
      const result = removeOneInstance(array, 'test');

      expect(result).toEqual([]);
    });

    it('should handle array with one element', () => {
      const array = ['hello'];
      const result = removeOneInstance(array, 'hello');

      expect(result).toEqual([]);
    });

    it('should not mutate the original array', () => {
      const array = ['hello', 'world'];
      const original = [...array];
      removeOneInstance(array, 'hello');

      expect(array).toEqual(original);
    });
  });

  describe('reorderWithinArray', () => {
    it('should move a word to a new position', () => {
      const array = ['a', 'b', 'c', 'd'];
      const result = reorderWithinArray(array, 'b', 3);

      expect(result).toEqual(['a', 'c', 'd', 'b']);
    });

    it('should move a word from end to beginning', () => {
      const array = ['a', 'b', 'c'];
      const result = reorderWithinArray(array, 'c', 0);

      expect(result).toEqual(['c', 'a', 'b']);
    });

    it('should move a word from beginning to end', () => {
      const array = ['a', 'b', 'c'];
      const result = reorderWithinArray(array, 'a', 2);

      expect(result).toEqual(['b', 'c', 'a']);
    });

    it('should handle reordering to the same position', () => {
      const array = ['a', 'b', 'c'];
      const result = reorderWithinArray(array, 'b', 1);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should not mutate the original array', () => {
      const array = ['a', 'b', 'c'];
      const original = [...array];
      reorderWithinArray(array, 'b', 2);

      expect(array).toEqual(original);
    });

    it('should handle duplicate words correctly (reorder first occurrence)', () => {
      const array = ['a', 'b', 'a', 'c'];
      const result = reorderWithinArray(array, 'a', 3);

      expect(result).toEqual(['b', 'a', 'c', 'a']);
    });
  });

  describe('insertAtPosition', () => {
    it('should insert word at the beginning', () => {
      const array = ['b', 'c'];
      const result = insertAtPosition(array, 'a', 0);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should insert word in the middle', () => {
      const array = ['a', 'c'];
      const result = insertAtPosition(array, 'b', 1);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should insert word at the end', () => {
      const array = ['a', 'b'];
      const result = insertAtPosition(array, 'c', 2);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should insert into an empty array', () => {
      const array: string[] = [];
      const result = insertAtPosition(array, 'a', 0);

      expect(result).toEqual(['a']);
    });

    it('should not mutate the original array', () => {
      const array = ['a', 'b'];
      const original = [...array];
      insertAtPosition(array, 'c', 1);

      expect(array).toEqual(original);
    });
  });

  describe('appendToArray', () => {
    it('should append word to the end', () => {
      const array = ['a', 'b'];
      const result = appendToArray(array, 'c');

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should append to an empty array', () => {
      const array: string[] = [];
      const result = appendToArray(array, 'a');

      expect(result).toEqual(['a']);
    });

    it('should not mutate the original array', () => {
      const array = ['a', 'b'];
      const original = [...array];
      appendToArray(array, 'c');

      expect(array).toEqual(original);
    });

    it('should handle duplicate words', () => {
      const array = ['a', 'b', 'a'];
      const result = appendToArray(array, 'a');

      expect(result).toEqual(['a', 'b', 'a', 'a']);
    });
  });

  describe('Integration: Building sentences with duplicate words', () => {
    it('should allow building "Es ist zehn nach zehn"', () => {
      let available = ['Es', 'ist', 'zehn', 'nach', 'zehn'];
      let rectangle: string[] = [];

      // Move first "zehn" to rectangle
      rectangle = appendToArray(rectangle, 'zehn');
      available = removeOneInstance(available, 'zehn');
      expect(available).toEqual(['Es', 'ist', 'nach', 'zehn']);
      expect(rectangle).toEqual(['zehn']);

      // Move second "zehn" to rectangle
      rectangle = appendToArray(rectangle, 'zehn');
      available = removeOneInstance(available, 'zehn');
      expect(available).toEqual(['Es', 'ist', 'nach']);
      expect(rectangle).toEqual(['zehn', 'zehn']);

      // Complete the sentence
      rectangle = insertAtPosition(rectangle, 'Es', 0);
      available = removeOneInstance(available, 'Es');

      rectangle = insertAtPosition(rectangle, 'ist', 1);
      available = removeOneInstance(available, 'ist');

      rectangle = insertAtPosition(rectangle, 'nach', 3);
      available = removeOneInstance(available, 'nach');

      expect(rectangle).toEqual(['Es', 'ist', 'zehn', 'nach', 'zehn']);
      expect(available).toEqual([]);
    });

    it('should allow removing and re-adding duplicate words', () => {
      let available = ['test', 'test'];
      let rectangle: string[] = [];

      // Add both
      rectangle = appendToArray(rectangle, 'test');
      available = removeOneInstance(available, 'test');
      rectangle = appendToArray(rectangle, 'test');
      available = removeOneInstance(available, 'test');

      expect(rectangle).toEqual(['test', 'test']);
      expect(available).toEqual([]);

      // Remove one
      available = appendToArray(available, 'test');
      rectangle = removeOneInstance(rectangle, 'test');

      expect(rectangle).toEqual(['test']);
      expect(available).toEqual(['test']);

      // Remove the other
      available = appendToArray(available, 'test');
      rectangle = removeOneInstance(rectangle, 'test');

      expect(rectangle).toEqual([]);
      expect(available).toEqual(['test', 'test']);
    });
  });
});
