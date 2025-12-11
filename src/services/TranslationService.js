class TranslationService {
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }
    return input;
  }
}

const translationService = new TranslationService();

export default translationService;
