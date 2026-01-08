import dictionaryService from '../../src/services/DictionaryService';

describe('DictionaryService', () => {
  describe('initialization', () => {
    test('loads dictionary data on construction', () => {
      expect(dictionaryService.data).toBeDefined();
      expect(dictionaryService.data.version).toBe('2.0.0');
    });
  });

  describe('getWordCount', () => {
    test('returns number of words in dictionary', () => {
      expect(dictionaryService.getWordCount()).toBe(196);
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
    test('creates reverse index on first use', () => {
      // Trigger lazy loading by calling translateToEnglish
      dictionaryService.translateToEnglish('hpy');

      expect(dictionaryService.reverseIndex).toBeDefined();
      expect(typeof dictionaryService.reverseIndex).toBe('object');
    });

    test('reverse index maps speedwriting to English', () => {
      // Trigger lazy loading
      dictionaryService.translateToEnglish('hpy');

      expect(dictionaryService.reverseIndex['hpy']).toContain('happy');
      expect(dictionaryService.reverseIndex['sd']).toContain('sad');
    });
  });

  describe('translateToEnglish', () => {
    test('translates known speedwriting to English', () => {
      expect(dictionaryService.translateToEnglish('hpy')).toBe('happy');
      expect(dictionaryService.translateToEnglish('sd')).toBe('sad');
    });

    test('returns unknown speedwriting unchanged', () => {
      expect(dictionaryService.translateToEnglish('xyz')).toBe('xyz');
    });

    test('handles case-insensitive lookup', () => {
      expect(dictionaryService.translateToEnglish('HPY')).toBe('happy');
      expect(dictionaryService.translateToEnglish('Hpy')).toBe('happy');
    });
  });
});
