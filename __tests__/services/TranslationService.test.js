import translationService from '../../src/services/TranslationService';

describe('TranslationService', () => {
  describe('translatePhrase', () => {
    test('returns empty string for empty input', () => {
      expect(translationService.translatePhrase('', 'to-speedwriting')).toBe('');
      expect(translationService.translatePhrase('', 'to-english')).toBe('');
    });

    test('returns empty string for whitespace-only input', () => {
      expect(translationService.translatePhrase('   ', 'to-speedwriting')).toBe('');
      expect(translationService.translatePhrase('  \t  ', 'to-english')).toBe('');
    });
  });
});
