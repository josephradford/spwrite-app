import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(input, direction) {
    // Handle empty input and whitespace-only input
    if (!input || input.trim() === '') {
      return '';
    }

    // Split by whitespace, filter out empty strings from multiple spaces
    const words = input.split(/\s+/).filter(word => word.length > 0);

    const translateFn = direction === 'to-speedwriting'
      ? (word) => dictionaryService.translateToSpeedwriting(word)
      : (word) => dictionaryService.translateToEnglish(word);

    const translatedWords = words.map(word => {
      // Handle pure punctuation or special characters - pass through unchanged
      if (!/\w/.test(word)) {
        return word;
      }

      // Preserve leading/trailing punctuation while translating word core
      const match = word.match(/^([^\w]*)(\w+)([^\w]*)$/);
      if (match) {
        const [, prefix, core, suffix] = match;
        // Only translate if core contains letters (not pure numbers)
        const translatedCore = /[a-zA-Z]/.test(core)
          ? translateFn(core)
          : core;
        return prefix + translatedCore + suffix;
      }
      return translateFn(word);
    });

    // Join with single space and trim any leading/trailing whitespace
    return translatedWords.join(' ').trim();
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
