import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    // Split by whitespace while preserving punctuation attached to words
    const words = input.split(/\s+/);

    const translateFn = direction === 'to-speedwriting'
      ? (word) => dictionaryService.translateToSpeedwriting(word)
      : (word) => dictionaryService.translateToEnglish(word);

    const translatedWords = words.map(word => {
      // Preserve leading/trailing punctuation
      const match = word.match(/^([^\w]*)(\w+)([^\w]*)$/);
      if (match) {
        const [, prefix, core, suffix] = match;
        return prefix + translateFn(core) + suffix;
      }
      return translateFn(word);
    });

    return translatedWords.join(' ');
  }

  translateToSpeedwriting(input) {
    return this.translatePhrase(input, 'to-speedwriting');
  }

  translateToEnglish(input) {
    return this.translatePhrase(input, 'to-english');
  }
}

const translationService = new TranslationService();

export default translationService;
