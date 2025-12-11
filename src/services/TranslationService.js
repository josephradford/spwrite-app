import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(text, direction) {
    if (!text || text.trim() === '') {
      return '';
    }

    // Split by whitespace and translate each word
    const words = text.split(/\s+/);

    const translatedWords = words.map(word => {
      // Separate punctuation from word core using regex
      const match = word.match(/^([^\w]*)(\w+)([^\w]*)$/);

      if (!match) {
        // Word is all punctuation or doesn't match pattern
        return word;
      }

      const [, leadingPunct, core, trailingPunct] = match;

      let translatedCore;
      if (direction === 'to-speedwriting') {
        translatedCore = dictionaryService.translateToSpeedwriting(core);
      } else if (direction === 'to-english') {
        translatedCore = dictionaryService.translateToEnglish(core);
      } else {
        translatedCore = core;
      }

      return leadingPunct + translatedCore + trailingPunct;
    });

    return translatedWords.join(' ');
  }
}

const translationService = new TranslationService();

export default translationService;
