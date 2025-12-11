const dictionaryData = require('../../data/dictionary.json');

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
  }
}

const dictionaryService = new DictionaryService();

module.exports = dictionaryService;
