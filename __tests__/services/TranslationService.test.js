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

  describe('to-speedwriting direction', () => {
    test('translates single word', () => {
      expect(translationService.translatePhrase('happy', 'to-speedwriting')).toBe('hpy');
    });

    test('translates unknown word unchanged', () => {
      expect(translationService.translatePhrase('unknown', 'to-speedwriting')).toBe('unknown');
    });

    test('translates multi-word phrase', () => {
      expect(translationService.translatePhrase('I feel happy', 'to-speedwriting')).toBe('I fel hpy');
      expect(translationService.translatePhrase('I feel happy today', 'to-speedwriting')).toBe('I fel hpy 2dy');
    });
  });

  describe('to-english direction', () => {
    test('translates single speedwriting word to English', () => {
      expect(translationService.translatePhrase('hpy', 'to-english')).toBe('happy');
    });

    test('translates speedwriting phrase to English', () => {
      expect(translationService.translatePhrase('I fel hpy', 'to-english')).toBe('I feel happy');
    });
  });

  describe('punctuation handling', () => {
    test('preserves punctuation in to-speedwriting', () => {
      expect(translationService.translatePhrase('I feel happy!', 'to-speedwriting')).toBe('I fel hpy!');
      expect(translationService.translatePhrase('Are you happy?', 'to-speedwriting')).toBe('r u hpy?');
    });

    test('preserves punctuation in to-english', () => {
      expect(translationService.translatePhrase('I fel hpy!', 'to-english')).toBe('I feel happy!');
    });
  });
});
