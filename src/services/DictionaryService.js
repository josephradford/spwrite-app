import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
  }

  getWordCount() {
    return Object.keys(this.data.words).length;
  }

  translateToSpeedwriting(englishWord) {
    const word = englishWord.toLowerCase();
    return this.data.words[word] || englishWord;
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
