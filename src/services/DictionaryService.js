import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
