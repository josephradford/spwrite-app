import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
    this.reverseIndex = null;
  }

  // Build reverse index for speedwriting -> English lookups
  _buildReverseIndex() {
    if (this.reverseIndex) return;

    this.reverseIndex = {};
    Object.entries(this.data.words).forEach(([english, speedwriting]) => {
      const lowerSpeedwriting = speedwriting.toLowerCase();
      if (!this.reverseIndex[lowerSpeedwriting]) {
        this.reverseIndex[lowerSpeedwriting] = [];
      }
      this.reverseIndex[lowerSpeedwriting].push(english);
    });
  }

  getWordCount() {
    return Object.keys(this.data.words).length;
  }

  translateToSpeedwriting(word) {
    const lowerWord = word.toLowerCase();
    return this.data.words[lowerWord] || word;
  }

  translateToEnglish(word) {
    this._buildReverseIndex();
    const lowerWord = word.toLowerCase();
    const matches = this.reverseIndex[lowerWord];

    if (!matches || matches.length === 0) {
      return word; // Unknown word, return as-is
    }

    // Return first match (handle ambiguity later in Phase 2)
    return matches[0];
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
