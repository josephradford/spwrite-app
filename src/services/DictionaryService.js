import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
    this.reverseIndex = this.buildReverseIndex();
  }

  buildReverseIndex() {
    const reverseIndex = {};
    for (const [english, speedwriting] of Object.entries(this.data.words)) {
      const lowerSpeedwriting = speedwriting.toLowerCase();
      reverseIndex[lowerSpeedwriting] = english;
    }
    return reverseIndex;
  }

  getWordCount() {
    return Object.keys(this.data.words).length;
  }

  translateToSpeedwriting(englishWord) {
    const word = englishWord.toLowerCase();
    return this.data.words[word] || englishWord;
  }

  translateToEnglish(speedwritingWord) {
    const word = speedwritingWord.toLowerCase();
    return this.reverseIndex[word] || speedwritingWord;
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
