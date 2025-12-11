import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
  }

  getWordCount() {
    return Object.keys(this.data.words).length;
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
