import dictionaryService from '../../src/services/DictionaryService';

describe('DictionaryService', () => {
  describe('initialization', () => {
    test('loads dictionary data on construction', () => {
      expect(dictionaryService.data).toBeDefined();
      expect(dictionaryService.data.version).toBe('1.0.0');
    });
  });

  describe('getWordCount', () => {
    test('returns number of words in dictionary', () => {
      expect(dictionaryService.getWordCount()).toBe(100);
    });
  });

  describe('translateToSpeedwriting', () => {
    test('translates known English word to speedwriting', () => {
      expect(dictionaryService.translateToSpeedwriting('happy')).toBe('hpy');
      expect(dictionaryService.translateToSpeedwriting('sad')).toBe('sd');
    });

    test('returns unknown word unchanged', () => {
      expect(dictionaryService.translateToSpeedwriting('unknown')).toBe('unknown');
    });

    test('handles case-insensitive lookup', () => {
      expect(dictionaryService.translateToSpeedwriting('Happy')).toBe('hpy');
      expect(dictionaryService.translateToSpeedwriting('HAPPY')).toBe('hpy');
    });
  });

  describe('buildReverseIndex', () => {
    test('creates reverse index on construction', () => {
      expect(dictionaryService.reverseIndex).toBeDefined();
      expect(typeof dictionaryService.reverseIndex).toBe('object');
    });

    test('reverse index maps speedwriting to English', () => {
      expect(dictionaryService.reverseIndex['hpy']).toBe('happy');
      expect(dictionaryService.reverseIndex['sd']).toBe('sad');
    });
  });
});
