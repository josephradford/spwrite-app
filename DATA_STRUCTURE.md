# SPWrite Data Structure Design

## Design Principles

1. **Data-driven, not code-driven** - Rules and translations live in JSON files
2. **Easily editable** - You should be able to add/modify words without changing code
3. **Bidirectional** - Support both English → Speedwriting and Speedwriting → English
4. **Future-proof** - Structure allows adding rules/explanations later
5. **KISS for MVP** - Start simple, enhance incrementally

---

## MVP Data Structure (Phase 0-1)

### dictionary.json

Simple key-value mapping for now. We'll enhance later.

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-12-10",
  "words": {
    "I": "I",
    "you": "u",
    "me": "me",
    "my": "my",
    "we": "we",
    "us": "us",
    "he": "he",
    "she": "she",
    "they": ".y",
    "the": ".",
    "a": "a",
    "and": "&",
    "to": "2",
    "of": "f",
    "with": "w/",
    "for": "fr",
    "in": "n",
    "on": "on",
    "at": "at",
    "is": "s",
    "feel": "fel",
    "happy": "hpy",
    "sad": "sd",
    "angry": "ngry",
    "worried": "wrd",
    "today": "2dy",
    "yesterday": "ystdy",
    "tomorrow": "2mrw",
    "morning": "mrng",
    "think": "thnk",
    "thought": "tht",
    "friend": "frnd",
    "family": "fmly",
    "love": "lv"
  }
}
```

**Structure:**
- `version`: Semantic versioning for dictionary updates
- `lastUpdated`: ISO date
- `words`: Object with English word (lowercase) as key, speedwriting as value

**Usage:**
- **English → Speedwriting:** Direct lookup `words["happy"]` → `"hpy"`
- **Speedwriting → English:** Reverse lookup (iterate/build reverse index)

---

## Translation Algorithm (MVP)

### Single Word Translation

```javascript
// English → Speedwriting
function translateToSpeedwriting(englishWord) {
  const word = englishWord.toLowerCase();
  return dictionary.words[word] || word; // Return original if not found
}

// Speedwriting → English
function translateToEnglish(speedwritingWord) {
  const word = speedwritingWord.toLowerCase();

  // Build reverse lookup (can cache this)
  for (let [english, speedwriting] of Object.entries(dictionary.words)) {
    if (speedwriting.toLowerCase() === word) {
      return english;
    }
  }

  return speedwritingWord; // Return original if not found
}
```

### Multi-Word Translation (Phase 1)

```javascript
function translatePhrase(input, direction) {
  // Split by spaces, preserve punctuation handling for later
  const words = input.split(/\s+/);

  const translateFn = direction === 'to-speedwriting'
    ? translateToSpeedwriting
    : translateToEnglish;

  const translatedWords = words.map(word => translateFn(word));

  return translatedWords.join(' ');
}
```

---

## Future Enhancement: Phase 2 Data Structure

When we add rules explanations:

```json
{
  "version": "2.0.0",
  "lastUpdated": "2025-01-15",
  "words": [
    {
      "english": "happy",
      "speedwriting": "hpy",
      "rules": ["omit-short-vowels"],
      "notes": "Omit 'a', keep long 'y'"
    },
    {
      "english": "the",
      "speedwriting": ".",
      "rules": ["common-abbreviation"],
      "notes": "Special abbreviation: period represents 'the'"
    }
  ],
  "rules": [
    {
      "id": "omit-short-vowels",
      "name": "Omit Short Vowels",
      "description": "Remove short vowels (a, e, i, o, u) from unstressed syllables",
      "examples": ["happy → hpy", "important → imprtnt"]
    },
    {
      "id": "common-abbreviation",
      "name": "Common Word Abbreviations",
      "description": "Frequently used words have special abbreviated forms",
      "examples": ["the → .", "and → &", "to → 2"]
    }
  ]
}
```

**Migration path:**
- Convert simple object to array of objects
- Add `rules` and `notes` fields
- Create separate `rules` section with explanations

---

## Handling Ambiguity

### Problem: Multiple English words → Same speedwriting

Example: "rd" could be "read", "road", or "red"

**MVP Solution (Phase 0-1):**
- Pick the most common word
- Store only one mapping in dictionary
- Document decision in comments/notes

**Future Solution (Phase 2+):**
```json
{
  "speedwriting": "rd",
  "englishOptions": [
    {"word": "read", "frequency": "high"},
    {"word": "road", "frequency": "medium"},
    {"word": "red", "frequency": "medium"}
  ]
}
```

Show multiple options in UI, let user pick, or use frequency-based suggestion.

---

## Performance Considerations

### Reverse Lookup Optimization

Building reverse index on every translation is inefficient.

**Solution: Cache reverse index**

```javascript
class Dictionary {
  constructor(data) {
    this.data = data;
    this.reverseIndex = this.buildReverseIndex();
  }

  buildReverseIndex() {
    const reverse = {};
    for (let [english, speedwriting] of Object.entries(this.data.words)) {
      reverse[speedwriting.toLowerCase()] = english;
    }
    return reverse;
  }

  translateToEnglish(speedwritingWord) {
    const word = speedwritingWord.toLowerCase();
    return this.reverseIndex[word] || speedwritingWord;
  }
}
```

**For React Native:**
- Load dictionary once on app startup
- Build reverse index once
- Store in state/context
- No network calls needed (bundled with app)

---

## File Organization

```
/data
  dictionary.json          # Main word mappings (MVP)
  rules.json              # Rule definitions (Phase 2+)

/src/services
  DictionaryService.js    # Load & cache dictionary
  TranslationService.js   # Translation logic
```

**DictionaryService responsibilities:**
- Load JSON from bundle
- Build reverse index
- Provide lookup methods
- (Future: Handle updates, user additions)

**TranslationService responsibilities:**
- Use DictionaryService for lookups
- Handle phrase splitting/joining
- (Future: Apply rules, handle punctuation)

---

## Local Storage (Future Feature)

For user bookmarks, custom words, etc:

```javascript
// AsyncStorage (React Native)
const userCustomWords = {
  "myname": "jrd",  // User's custom abbreviations
  "coffee": "cfe"
}

// Merge with main dictionary
const combinedDictionary = {
  ...mainDictionary.words,
  ...userCustomWords
}
```

---

## Validation & Testing

### Dictionary Validation

Ensure data integrity:

```javascript
function validateDictionary(dict) {
  // Check for duplicate speedwriting entries (ambiguity)
  const speedwritingValues = Object.values(dict.words);
  const duplicates = speedwritingValues.filter(
    (item, index) => speedwritingValues.indexOf(item) !== index
  );

  if (duplicates.length > 0) {
    console.warn('Ambiguous speedwriting entries:', duplicates);
  }

  // Check for empty values
  for (let [english, speedwriting] of Object.entries(dict.words)) {
    if (!speedwriting || speedwriting.trim() === '') {
      console.error('Empty speedwriting for:', english);
    }
  }
}
```

### Test Cases

```javascript
// Test bidirectional translation
expect(translateToSpeedwriting("happy")).toBe("hpy");
expect(translateToEnglish("hpy")).toBe("happy");

// Test unknown words (pass-through)
expect(translateToSpeedwriting("xyzabc")).toBe("xyzabc");

// Test case-insensitivity
expect(translateToSpeedwriting("HAPPY")).toBe("hpy");
expect(translateToEnglish("HPY")).toBe("happy");
```

---

## Migration Strategy

### Version 1.0 → 2.0 (Adding Rules)

```javascript
function migrateV1toV2(oldDict) {
  return {
    version: "2.0.0",
    lastUpdated: new Date().toISOString(),
    words: Object.entries(oldDict.words).map(([english, speedwriting]) => ({
      english,
      speedwriting,
      rules: [],  // Populate manually or via script
      notes: ""
    })),
    rules: []
  };
}
```

---

## Decision Log

### Why Object instead of Array for MVP?

**Chose:** `{ "happy": "hpy" }` over `[{ "english": "happy", "speedwriting": "hpy" }]`

**Reasons:**
1. Simpler to read and edit manually
2. Direct key lookup is faster O(1) vs O(n)
3. Less verbose for 100+ words
4. Easy to migrate to array structure later

**Trade-off:**
- Harder to add metadata (rules, notes) later
- Acceptable for MVP, will migrate in Phase 2

### Why Lowercase Keys?

All dictionary keys are lowercase to simplify case-insensitive lookup.

User input will be lowercased before lookup, then original casing can be preserved in output if needed.

---

## Next Steps

1. Create `dictionary.json` with 100 starter words from RESEARCH.md
2. Implement DictionaryService
3. Implement TranslationService
4. Write unit tests
5. Integrate with UI

Ready to build!
