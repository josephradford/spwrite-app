import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    if (direction === 'to-speedwriting') {
      return dictionaryService.translateToSpeedwriting(input);
    }

    return input;
  }
}

const translationService = new TranslationService();

export default translationService;
