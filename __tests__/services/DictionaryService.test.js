import dictionaryService from '../../src/services/DictionaryService';

describe('DictionaryService', () => {
  describe('initialization', () => {
    test('loads dictionary data on construction', () => {
      expect(dictionaryService.data).toBeDefined();
      expect(dictionaryService.data.version).toBe('1.0.0');
    });
  });
});
