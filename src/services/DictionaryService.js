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
      // Handle potential duplicates (ambiguous speedwriting)
      if (reverse[key]) {
        // Store as array if multiple English words map to same speedwriting
        if (Array.isArray(reverse[key])) {
          reverse[key].push(english);
        } else {
          reverse[key] = [reverse[key], english];
        }
      } else {
        reverse[key] = english;
      }
    }
    return reverse;
  }

  translateToSpeedwriting(englishWord) {
    const word = englishWord.toLowerCase();
    return this.data.words[word] || englishWord;
  }

  translateToEnglish(speedwritingWord) {
    const word = speedwritingWord.toLowerCase();
    const result = this.reverseIndex[word];

    if (!result) {
      return speedwritingWord;
    }

    // If ambiguous (multiple options), return first one for MVP
    return Array.isArray(result) ? result[0] : result;
  }

  getWordCount() {
    return Object.keys(this.data.words).length;
  }

  getVersion() {
    return this.data.version;
  }
}

// Singleton instance
const dictionaryService = new DictionaryService();

export default dictionaryService;
