import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
    this.reverseIndex = this.buildReverseIndex();
  }

  buildReverseIndex() {
    const reverse = {};
    for (let [english, speedwriting] of Object.entries(this.data.words)) {
      const key = speedwriting.toLowerCase();
      reverse[key] = english;
    }
    return reverse;
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
