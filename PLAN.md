# SPWrite MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a mobile translator app for Dearborn speedwriting system using React Native + Expo

**Architecture:** Data-driven translation engine with dictionary JSON, service layer for lookups, and React Native UI components. Tests verify behavior at each layer.

**Tech Stack:** React Native 0.81.5, Expo 54, Jest with React Native Testing Library

---

## Phase 0: Project Setup ✅ COMPLETE

**Status:** All 6 tasks completed (2025-12-11)
**Commits:** 31b4842, c544fba, 7d38ec3, 1c8f210, d4a7e81, 4939860

### Task 1: Verify Node and npm ✅

**Files:** N/A

**Step 1: Check Node version**

```bash
node --version
```

Expected: v16 or higher (e.g., `v18.19.0`)

**Step 2: Check npm version**

```bash
npm --version
```

Expected: v8 or higher (e.g., `9.2.0`)

**Step 3: Verify both commands succeeded**

If either fails, install Node.js from https://nodejs.org

---

### Task 2: Initialize Expo Project ✅

**Files:** Creates project structure

**Step 1: Initialize Expo project in current directory**

```bash
npx create-expo-app@latest . --template blank
```

Expected: Creates `package.json`, `App.js`, `app.json`, `index.js`, `node_modules/`

**Step 2: Verify key files exist**

```bash
ls package.json App.js app.json index.js
```

Expected: All files listed without error

**Step 3: Commit initial Expo setup**

```bash
git add .
git commit -m "feat: initialize Expo project with blank template"
```

---

### Task 3: Install Test Dependencies ✅

**Files:** Modifies `package.json`

**Step 1: Install Jest and React Native Testing Library**

```bash
npm install --save-dev jest jest-expo @testing-library/react-native @testing-library/jest-native
```

Expected: Dependencies added to `devDependencies` in `package.json`

**Step 2: Add Jest configuration to package.json**

Add this to `package.json`:

```json
"jest": {
  "preset": "jest-expo",
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))"
  ]
}
```

**Step 3: Add test script to package.json**

Add to `"scripts"` section:

```json
"test": "jest"
```

**Step 4: Verify test setup**

```bash
npm test
```

Expected: "No tests found" (setup works, just no tests yet)

**Step 5: Commit test configuration**

```bash
git add package.json package-lock.json
git commit -m "feat: add Jest and React Native Testing Library"
```

---

### Task 4: Install App Dependencies ✅

**Files:** Modifies `package.json`

**Step 1: Install AsyncStorage and Clipboard**

```bash
npm install @react-native-async-storage/async-storage
npx expo install expo-clipboard
```

Expected: Dependencies added to `dependencies` in `package.json`

**Step 2: Verify installation**

```bash
npm list @react-native-async-storage/async-storage expo-clipboard
```

Expected: Both packages listed with versions

**Step 3: Commit dependencies**

```bash
git add package.json package-lock.json
git commit -m "feat: add AsyncStorage and Clipboard dependencies"
```

---

### Task 5: Create Project Directory Structure ✅

**Files:** Creates directories

**Step 1: Create directory structure**

```bash
mkdir -p data src/services src/components src/screens __tests__/services __tests__/components
```

**Step 2: Verify directories exist**

```bash
ls -d data src/services src/components src/screens __tests__/services __tests__/components
```

Expected: All directories listed

**Step 3: Commit directory structure**

```bash
git add data src __tests__
git commit -m "feat: create project directory structure"
```

---

### Task 6: Set up GitHub Flow workflow ✅

**Files:** Creates `.github/WORKFLOW.md`

**Step 1: Verify current branch is main**

```bash
git branch --show-current
```

Expected: `main`

**Step 2: Create GitHub Flow workflow documentation**

Create `.github/WORKFLOW.md`:

```markdown
# GitHub Flow Workflow

This project follows [GitHub Flow](https://guides.github.com/introduction/flow/) for development.

## The Workflow

1. **Branch from main** - Create a feature branch from main
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** - Commit regularly with descriptive messages
   ```bash
   git add .
   git commit -m "feat: description of change"
   ```

3. **Push to remote** - Share your work
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Open Pull Request** - Start discussion and review
   ```bash
   gh pr create --title "Feature: Description" --body "Details..."
   ```

5. **Review and discuss** - Collaborate on the PR
   - Address review feedback
   - Push additional commits to the same branch

6. **Merge to main** - When approved and tests pass
   ```bash
   gh pr merge --squash
   ```

7. **Delete feature branch** - Clean up
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/changes

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Branch Protection (Optional)

For team projects, set up branch protection in GitHub:
1. Go to Settings > Branches
2. Add rule for `main` branch
3. Enable: Require pull request reviews before merging
4. Enable: Require status checks to pass
5. Enable: Require branches to be up to date

For solo projects, this is optional but good practice.
```

**Step 3: Verify file created**

```bash
cat .github/WORKFLOW.md
```

Expected: File contents display correctly

**Step 4: Commit workflow documentation**

```bash
mkdir -p .github
git add .github/WORKFLOW.md
git commit -m "docs: add GitHub Flow workflow documentation"
```

**Step 5: Push to remote**

```bash
git push
```

Expected: Changes pushed to `main` successfully

---

## Phase 1: Data Layer (TDD)

### Task 7: Create Dictionary JSON ✅

**Completed:** 2025-12-11 | **Branch:** feature/dictionary-json

**Files:**
- Create: `data/dictionary.json`

**Step 1: Create dictionary.json with 100 words**

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-12-11",
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
    "anxious": "nxs",
    "calm": "clm",
    "peaceful": "pcefl",
    "grateful": "grtfl",
    "tired": "trd",
    "energetic": "nrjtc",
    "stressed": "strsd",
    "content": "cntnt",
    "frustrated": "frstrtd",
    "hopeful": "hpfl",
    "excited": "xctd",
    "confused": "cnfzd",
    "overwhelmed": "vrwlmd",
    "proud": "prd",
    "ashamed": "shmd",
    "today": "2dy",
    "yesterday": "ystdy",
    "tomorrow": "2mrw",
    "morning": "mrng",
    "afternoon": "ftrnn",
    "evening": "vng",
    "night": "ngt",
    "week": "wk",
    "month": "mnth",
    "year": "yr",
    "work": "wrk",
    "home": "hm",
    "sleep": "slp",
    "wake": "wk",
    "eat": "et",
    "cook": "ck",
    "read": "rd",
    "write": "rt",
    "walk": "wlk",
    "exercise": "xrcs",
    "think": "thnk",
    "thought": "tht",
    "idea": "ida",
    "remember": "rmmber",
    "forget": "frgt",
    "decide": "dcde",
    "choice": "chc",
    "believe": "blve",
    "doubt": "dbt",
    "understand": "ndrst&",
    "confuse": "cnfz",
    "realize": "rlze",
    "hope": "hp",
    "wish": "wsh",
    "want": "wnt",
    "need": "nd",
    "try": "try",
    "learn": "lrn",
    "grow": "grw",
    "change": "chng",
    "friend": "frnd",
    "family": "fmly",
    "partner": "prtnr",
    "love": "lv",
    "like": "lk",
    "care": "cr",
    "help": "hlp",
    "support": "sprt",
    "listen": "lstn",
    "talk": "tlk",
    "speak": "spk",
    "say": "sy",
    "tell": "tll",
    "call": "cll",
    "meet": "mt",
    "visit": "vst",
    "share": "shr",
    "thank": "thnk",
    "sorry": "sry",
    "forgive": "frgv"
  }
}
```

**Step 2: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('data/dictionary.json', 'utf8'))"
```

Expected: No output (success)

**Step 3: Commit dictionary**

```bash
git add data/dictionary.json
git commit -m "feat: add 100-word speedwriting dictionary"
```

---

### Task 8: Set up GitHub Actions for automated testing ✅

**Completed:** 2025-12-11 | **Branch:** feature/github-actions-ci

**Files:** Creates `.github/workflows/test.yml`

**Step 1: Create GitHub Actions workflow directory**

```bash
mkdir -p .github/workflows
```

**Step 2: Create test workflow file**

Create `.github/workflows/test.yml`:

```yaml
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Upload coverage (if applicable)
      if: matrix.node-version == '20.x'
      uses: codecov/codecov-action@v3
      continue-on-error: true
```

**Step 3: Verify workflow file**

```bash
cat .github/workflows/test.yml
```

Expected: Workflow file contents display correctly

**Step 4: Commit GitHub Actions workflow**

```bash
git add .github/workflows/test.yml
git commit -m "ci: add GitHub Actions workflow for automated testing"
```

**Step 5: Push to remote**

```bash
git push
```

Expected: Changes pushed successfully. GitHub Actions will run on this push (may show "no tests found" initially, which is expected).

**Step 6: Verify workflow runs on GitHub**

Visit: `https://github.com/josephradford/spwrite-app/actions`

Expected: See "Run Tests" workflow in the actions list. Initial run may fail with "no tests found" - this is expected and will pass once tests are added.

---

### Task 9: Test - DictionaryService loads dictionary ✅ (e876e5f)

**Files:**
- Create: `__tests__/services/DictionaryService.test.js`

**Step 1: Write failing test for loading dictionary**

```javascript
import dictionaryService from '../../src/services/DictionaryService';

describe('DictionaryService', () => {
  describe('initialization', () => {
    test('loads dictionary data on construction', () => {
      expect(dictionaryService.data).toBeDefined();
      expect(dictionaryService.data.version).toBe('1.0.0');
    });
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DictionaryService.test.js
```

Expected: FAIL with "Cannot find module '../../src/services/DictionaryService'"

**Step 3: Write minimal implementation**

Create `src/services/DictionaryService.js`:

```javascript
import dictionaryData from '../../data/dictionary.json';

class DictionaryService {
  constructor() {
    this.data = dictionaryData;
  }
}

const dictionaryService = new DictionaryService();

export default dictionaryService;
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DictionaryService.test.js
```

Expected: PASS (1 test)

**Step 5: Commit**

```bash
git add __tests__/services/DictionaryService.test.js src/services/DictionaryService.js
git commit -m "feat: DictionaryService loads dictionary data"
```

---

### Task 10: Test - DictionaryService counts words ✅ (f92d6e2)

**Files:**
- Modify: `__tests__/services/DictionaryService.test.js`
- Modify: `src/services/DictionaryService.js`

**Step 1: Write failing test for getWordCount**

Add to `__tests__/services/DictionaryService.test.js`:

```javascript
  describe('getWordCount', () => {
    test('returns number of words in dictionary', () => {
      expect(dictionaryService.getWordCount()).toBe(100); // Updated: 100 words in final dictionary
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DictionaryService.test.js
```

Expected: FAIL with "dictionaryService.getWordCount is not a function"

**Step 3: Write minimal implementation**

Add to `src/services/DictionaryService.js` (inside class):

```javascript
  getWordCount() {
    return Object.keys(this.data.words).length;
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DictionaryService.test.js
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add __tests__/services/DictionaryService.test.js src/services/DictionaryService.js
git commit -m "feat: add getWordCount to DictionaryService"
```

---

### Task 11: Test - DictionaryService translates English to speedwriting ✅ (44ba8b9)

**Files:**
- Modify: `__tests__/services/DictionaryService.test.js`
- Modify: `src/services/DictionaryService.js`

**Step 1: Write failing test for translateToSpeedwriting**

Add to `__tests__/services/DictionaryService.test.js`:

```javascript
  describe('translateToSpeedwriting', () => {
    test('translates known English word to speedwriting', () => {
      expect(dictionaryService.translateToSpeedwriting('happy')).toBe('hpy');
      expect(dictionaryService.translateToSpeedwriting('sad')).toBe('sd');
    });

    test('returns unknown word unchanged', () => {
      expect(dictionaryService.translateToSpeedwriting('unknown')).toBe('unknown');
    });

    test('handles case-insensitive lookup', () => {
      expect(dictionaryService.translateToSpeedwriting('Happy')).toBe('hpy');
      expect(dictionaryService.translateToSpeedwriting('HAPPY')).toBe('hpy');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DictionaryService.test.js
```

Expected: FAIL with "dictionaryService.translateToSpeedwriting is not a function"

**Step 3: Write minimal implementation**

Add to `src/services/DictionaryService.js`:

```javascript
  translateToSpeedwriting(englishWord) {
    const word = englishWord.toLowerCase();
    return this.data.words[word] || englishWord;
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DictionaryService.test.js
```

Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add __tests__/services/DictionaryService.test.js src/services/DictionaryService.js
git commit -m "feat: add translateToSpeedwriting to DictionaryService"
```

---

### Task 12: Test - DictionaryService builds reverse index ✅ (30bbb8b)

**Files:**
- Modify: `__tests__/services/DictionaryService.test.js`
- Modify: `src/services/DictionaryService.js`

**Step 1: Write failing test for reverse index**

Add to `__tests__/services/DictionaryService.test.js`:

```javascript
  describe('buildReverseIndex', () => {
    test('creates reverse index on construction', () => {
      expect(dictionaryService.reverseIndex).toBeDefined();
      expect(typeof dictionaryService.reverseIndex).toBe('object');
    });

    test('reverse index maps speedwriting to English', () => {
      expect(dictionaryService.reverseIndex['hpy']).toBe('happy');
      expect(dictionaryService.reverseIndex['sd']).toBe('sad');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DictionaryService.test.js
```

Expected: FAIL with "Cannot read property 'hpy' of undefined"

**Step 3: Write minimal implementation**

Update `src/services/DictionaryService.js`:

```javascript
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
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DictionaryService.test.js
```

Expected: PASS (7 tests)

**Step 5: Commit**

```bash
git add __tests__/services/DictionaryService.test.js src/services/DictionaryService.js
git commit -m "feat: add reverse index to DictionaryService"
```

---

### Task 13: Test - DictionaryService translates speedwriting to English ✅ (26bd3d8)

**Files:**
- Modify: `__tests__/services/DictionaryService.test.js`
- Modify: `src/services/DictionaryService.js`

**Step 1: Write failing test for translateToEnglish**

Add to `__tests__/services/DictionaryService.test.js`:

```javascript
  describe('translateToEnglish', () => {
    test('translates known speedwriting to English', () => {
      expect(dictionaryService.translateToEnglish('hpy')).toBe('happy');
      expect(dictionaryService.translateToEnglish('sd')).toBe('sad');
    });

    test('returns unknown speedwriting unchanged', () => {
      expect(dictionaryService.translateToEnglish('xyz')).toBe('xyz');
    });

    test('handles case-insensitive lookup', () => {
      expect(dictionaryService.translateToEnglish('HPY')).toBe('happy');
      expect(dictionaryService.translateToEnglish('Hpy')).toBe('happy');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DictionaryService.test.js
```

Expected: FAIL with "dictionaryService.translateToEnglish is not a function"

**Step 3: Write minimal implementation**

Add to `src/services/DictionaryService.js`:

```javascript
  translateToEnglish(speedwritingWord) {
    const word = speedwritingWord.toLowerCase();
    return this.reverseIndex[word] || speedwritingWord;
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DictionaryService.test.js
```

Expected: PASS (10 tests)

**Step 5: Commit**

```bash
git add __tests__/services/DictionaryService.test.js src/services/DictionaryService.js
git commit -m "feat: add translateToEnglish to DictionaryService"
```

---

### Task 14: Test - TranslationService translates empty input ✅ (65927df)

**Files:**
- Create: `__tests__/services/TranslationService.test.js`
- Create: `src/services/TranslationService.js`

**Step 1: Write failing test for empty input**

```javascript
import translationService from '../../src/services/TranslationService';

describe('TranslationService', () => {
  describe('translatePhrase', () => {
    test('returns empty string for empty input', () => {
      expect(translationService.translatePhrase('', 'to-speedwriting')).toBe('');
      expect(translationService.translatePhrase('', 'to-english')).toBe('');
    });

    test('returns empty string for whitespace-only input', () => {
      expect(translationService.translatePhrase('   ', 'to-speedwriting')).toBe('');
      expect(translationService.translatePhrase('  \t  ', 'to-english')).toBe('');
    });
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationService.test.js
```

Expected: FAIL with "Cannot find module '../../src/services/TranslationService'"

**Step 3: Write minimal implementation**

Create `src/services/TranslationService.js`:

```javascript
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
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationService.test.js
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add __tests__/services/TranslationService.test.js src/services/TranslationService.js
git commit -m "feat: TranslationService handles empty input"
```

---

### Task 15: Test - TranslationService translates single word to speedwriting ✅ (869a4e9)

**Files:**
- Modify: `__tests__/services/TranslationService.test.js`
- Modify: `src/services/TranslationService.js`

**Step 1: Write failing test for single word translation**

Add to `__tests__/services/TranslationService.test.js`:

```javascript
  describe('to-speedwriting direction', () => {
    test('translates single word', () => {
      expect(translationService.translatePhrase('happy', 'to-speedwriting')).toBe('hpy');
    });

    test('translates unknown word unchanged', () => {
      expect(translationService.translatePhrase('unknown', 'to-speedwriting')).toBe('unknown');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationService.test.js
```

Expected: FAIL - Expected 'hpy', received 'happy'

**Step 3: Write minimal implementation**

Update `src/services/TranslationService.js`:

```javascript
import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    if (direction === 'to-speedwriting') {
      return dictionaryService.translateToSpeedwriting(input);
    }

    return input;
  }
}

const translationService = new TranslationService();

export default translationService;
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationService.test.js
```

Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add __tests__/services/TranslationService.test.js src/services/TranslationService.js
git commit -m "feat: TranslationService translates single word to speedwriting"
```

---

### Task 16: Test - TranslationService translates phrase to speedwriting ✅ (24d5267)

**Files:**
- Modify: `__tests__/services/TranslationService.test.js`
- Modify: `src/services/TranslationService.js`

**Step 1: Write failing test for phrase translation**

Add to `__tests__/services/TranslationService.test.js` in 'to-speedwriting direction':

```javascript
    test('translates multi-word phrase', () => {
      expect(translationService.translatePhrase('I feel happy', 'to-speedwriting')).toBe('I fel hpy');
      expect(translationService.translatePhrase('I feel happy today', 'to-speedwriting')).toBe('I fel hpy 2dy');
    });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationService.test.js
```

Expected: FAIL - phrase not split into words

**Step 3: Write minimal implementation**

Update `src/services/TranslationService.js`:

```javascript
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    const words = input.split(/\s+/).filter(word => word.length > 0);

    if (direction === 'to-speedwriting') {
      return words.map(word => dictionaryService.translateToSpeedwriting(word)).join(' ');
    }

    return input;
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationService.test.js
```

Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add __tests__/services/TranslationService.test.js src/services/TranslationService.js
git commit -m "feat: TranslationService translates phrases to speedwriting"
```

---

### Task 17: Test - TranslationService translates to English ✅ (24d5267)

**Files:**
- Modify: `__tests__/services/TranslationService.test.js`
- Modify: `src/services/TranslationService.js`

**Step 1: Write failing test for English translation**

Add to `__tests__/services/TranslationService.test.js`:

```javascript
  describe('to-english direction', () => {
    test('translates single speedwriting word to English', () => {
      expect(translationService.translatePhrase('hpy', 'to-english')).toBe('happy');
    });

    test('translates speedwriting phrase to English', () => {
      expect(translationService.translatePhrase('I fel hpy', 'to-english')).toBe('I feel happy');
      expect(translationService.translatePhrase('I fel hpy 2dy', 'to-english')).toBe('I feel happy today');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationService.test.js
```

Expected: FAIL - to-english direction not implemented

**Step 3: Write minimal implementation**

Update `src/services/TranslationService.js`:

```javascript
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    const words = input.split(/\s+/).filter(word => word.length > 0);

    const translateFn = direction === 'to-speedwriting'
      ? (word) => dictionaryService.translateToSpeedwriting(word)
      : (word) => dictionaryService.translateToEnglish(word);

    return words.map(translateFn).join(' ');
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationService.test.js
```

Expected: PASS (7 tests)

**Step 5: Commit**

```bash
git add __tests__/services/TranslationService.test.js src/services/TranslationService.js
git commit -m "feat: TranslationService translates to English"
```

---

### Task 18: Test - TranslationService preserves punctuation ✅ (24d5267)

**Files:**
- Modify: `__tests__/services/TranslationService.test.js`
- Modify: `src/services/TranslationService.js`

**Step 1: Write failing test for punctuation preservation**

Add to `__tests__/services/TranslationService.test.js`:

```javascript
  describe('punctuation handling', () => {
    test('preserves trailing punctuation', () => {
      expect(translationService.translatePhrase('happy!', 'to-speedwriting')).toBe('hpy!');
      expect(translationService.translatePhrase('happy?', 'to-speedwriting')).toBe('hpy?');
      expect(translationService.translatePhrase('happy.', 'to-speedwriting')).toBe('hpy.');
    });

    test('preserves leading punctuation', () => {
      expect(translationService.translatePhrase('(happy)', 'to-speedwriting')).toBe('(hpy)');
    });

    test('preserves punctuation in phrases', () => {
      expect(translationService.translatePhrase('I feel happy!', 'to-speedwriting')).toBe('I fel hpy!');
    });
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationService.test.js
```

Expected: FAIL - punctuation not preserved

**Step 3: Write minimal implementation**

Update `src/services/TranslationService.js`:

```javascript
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    const words = input.split(/\s+/).filter(word => word.length > 0);

    const translateFn = direction === 'to-speedwriting'
      ? (word) => dictionaryService.translateToSpeedwriting(word)
      : (word) => dictionaryService.translateToEnglish(word);

    const translatedWords = words.map(word => {
      // Preserve leading/trailing punctuation
      const match = word.match(/^([^\w]*)(\w+)([^\w]*)$/);
      if (match) {
        const [, prefix, core, suffix] = match;
        return prefix + translateFn(core) + suffix;
      }
      return translateFn(word);
    });

    return translatedWords.join(' ');
  }
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationService.test.js
```

Expected: PASS (10 tests)

**Step 5: Commit**

```bash
git add __tests__/services/TranslationService.test.js src/services/TranslationService.js
git commit -m "feat: TranslationService preserves punctuation"
```

---

## Phase 2: UI Components (TDD)

### Task 19: Test - DirectionToggle renders correct text

**Files:**
- Create: `__tests__/components/DirectionToggle.test.js`
- Create: `src/components/DirectionToggle.js`

**Step 1: Write failing test for DirectionToggle**

```javascript
import React from 'react';
import { render } from '@testing-library/react-native';
import DirectionToggle from '../../src/components/DirectionToggle';

describe('DirectionToggle', () => {
  test('renders "English → Speedwriting" when direction is to-speedwriting', () => {
    const { getByText } = render(
      <DirectionToggle direction="to-speedwriting" onToggle={() => {}} />
    );
    expect(getByText('English → Speedwriting')).toBeTruthy();
  });

  test('renders "Speedwriting → English" when direction is to-english', () => {
    const { getByText } = render(
      <DirectionToggle direction="to-english" onToggle={() => {}} />
    );
    expect(getByText('Speedwriting → English')).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DirectionToggle.test.js
```

Expected: FAIL with "Cannot find module '../../src/components/DirectionToggle'"

**Step 3: Write minimal implementation**

Create `src/components/DirectionToggle.js`:

```javascript
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function DirectionToggle({ direction, onToggle }) {
  const isToSpeedwriting = direction === 'to-speedwriting';

  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <Text style={styles.text}>
        {isToSpeedwriting ? 'English → Speedwriting' : 'Speedwriting → English'}
      </Text>
      <Text style={styles.swapIcon}>⇅</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
  swapIcon: {
    fontSize: 20,
  },
});
```

**Step 4: Run test to verify it passes**

```bash
npm test -- DirectionToggle.test.js
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add __tests__/components/DirectionToggle.test.js src/components/DirectionToggle.js
git commit -m "feat: add DirectionToggle component"
```

---

### Task 20: Test - DirectionToggle calls onToggle

**Files:**
- Modify: `__tests__/components/DirectionToggle.test.js`

**Step 1: Write failing test for onToggle callback**

Add to `__tests__/components/DirectionToggle.test.js`:

```javascript
import { render, fireEvent } from '@testing-library/react-native';

  test('calls onToggle when pressed', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <DirectionToggle direction="to-speedwriting" onToggle={mockToggle} />
    );

    fireEvent.press(getByText('English → Speedwriting'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- DirectionToggle.test.js
```

Expected: FAIL (if Pressable not wired correctly)

**Step 3: Verify implementation already passes**

The implementation already has `onPress={onToggle}` so this should pass.

**Step 4: Run test to verify it passes**

```bash
npm test -- DirectionToggle.test.js
```

Expected: PASS (3 tests)

**Step 5: Commit**

```bash
git add __tests__/components/DirectionToggle.test.js
git commit -m "test: add DirectionToggle onToggle callback test"
```

---

### Task 21: Test - TranslationInput renders with placeholder

**Files:**
- Create: `__tests__/components/TranslationInput.test.js`
- Create: `src/components/TranslationInput.js`

**Step 1: Write failing test for TranslationInput**

```javascript
import React from 'react';
import { render } from '@testing-library/react-native';
import TranslationInput from '../../src/components/TranslationInput';

describe('TranslationInput', () => {
  test('renders TextInput with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TranslationInput
        value=""
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  test('displays current value', () => {
    const { getByDisplayValue } = render(
      <TranslationInput
        value="test input"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByDisplayValue('test input')).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationInput.test.js
```

Expected: FAIL with "Cannot find module '../../src/components/TranslationInput'"

**Step 3: Write minimal implementation**

Create `src/components/TranslationInput.js`:

```javascript
import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function TranslationInput({ value, onChangeText, placeholder, onClear }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 24,
    color: '#8E8E93',
  },
});
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationInput.test.js
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add __tests__/components/TranslationInput.test.js src/components/TranslationInput.js
git commit -m "feat: add TranslationInput component"
```

---

### Task 22: Test - TranslationInput shows clear button when has text

**Files:**
- Modify: `__tests__/components/TranslationInput.test.js`

**Step 1: Write failing test for clear button visibility**

Add to `__tests__/components/TranslationInput.test.js`:

```javascript
import { render, fireEvent } from '@testing-library/react-native';

  test('shows clear button when value is not empty', () => {
    const { getByText } = render(
      <TranslationInput
        value="test"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByText('×')).toBeTruthy();
  });

  test('hides clear button when value is empty', () => {
    const { queryByText } = render(
      <TranslationInput
        value=""
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(queryByText('×')).toBeNull();
  });

  test('calls onClear when clear button pressed', () => {
    const mockClear = jest.fn();
    const { getByText } = render(
      <TranslationInput
        value="test"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={mockClear}
      />
    );

    fireEvent.press(getByText('×'));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationInput.test.js
```

Expected: May already pass since implementation exists

**Step 3: Verify implementation passes**

The implementation already has conditional clear button rendering.

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationInput.test.js
```

Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add __tests__/components/TranslationInput.test.js
git commit -m "test: add TranslationInput clear button tests"
```

---

### Task 23: Test - TranslationOutput displays text

**Files:**
- Create: `__tests__/components/TranslationOutput.test.js`
- Create: `src/components/TranslationOutput.js`

**Step 1: Write failing test for TranslationOutput**

```javascript
import React from 'react';
import { render } from '@testing-library/react-native';
import TranslationOutput from '../../src/components/TranslationOutput';

describe('TranslationOutput', () => {
  test('displays provided value', () => {
    const { getByText } = render(<TranslationOutput value="translated text" />);
    expect(getByText('translated text')).toBeTruthy();
  });

  test('displays placeholder when value is empty', () => {
    const { getByText } = render(<TranslationOutput value="" />);
    expect(getByText('Translation appears here')).toBeTruthy();
  });

  test('displays placeholder when value is null', () => {
    const { getByText } = render(<TranslationOutput value={null} />);
    expect(getByText('Translation appears here')).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationOutput.test.js
```

Expected: FAIL with "Cannot find module '../../src/components/TranslationOutput'"

**Step 3: Write minimal implementation**

Create `src/components/TranslationOutput.js`:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TranslationOutput({ value }) {
  return (
    <View style={styles.container}>
      <View style={styles.output}>
        <Text style={styles.text}>
          {value || 'Translation appears here'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  output: {
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  text: {
    fontSize: 17,
    color: '#000',
  },
});
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationOutput.test.js
```

Expected: PASS (3 tests)

**Step 5: Commit**

```bash
git add __tests__/components/TranslationOutput.test.js src/components/TranslationOutput.js
git commit -m "feat: add TranslationOutput component"
```

---

### Task 24: Create TranslatorScreen

**Files:**
- Create: `src/screens/TranslatorScreen.js`

**Note:** TranslatorScreen is integration of components. Full TDD for screen components with state management can be complex. We'll create the screen using our tested components.

**Step 1: Create TranslatorScreen**

```javascript
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import DirectionToggle from '../components/DirectionToggle';
import TranslationInput from '../components/TranslationInput';
import TranslationOutput from '../components/TranslationOutput';
import translationService from '../services/TranslationService';

export default function TranslatorScreen() {
  const [direction, setDirection] = useState('to-speedwriting');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleToggleDirection = () => {
    setDirection(prev =>
      prev === 'to-speedwriting' ? 'to-english' : 'to-speedwriting'
    );
    setOutputText('');
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const result = translationService.translatePhrase(inputText, direction);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const placeholder = direction === 'to-speedwriting'
    ? 'Type English words...'
    : 'Type speedwriting...';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>SPWrite</Text>
        </View>

        <DirectionToggle
          direction={direction}
          onToggle={handleToggleDirection}
        />

        <TranslationInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          onClear={handleClear}
        />

        <Pressable
          style={[styles.translateButton, !inputText.trim() && styles.buttonDisabled]}
          onPress={handleTranslate}
          disabled={!inputText.trim()}
        >
          <Text style={styles.translateButtonText}>Translate</Text>
        </Pressable>

        <TranslationOutput value={outputText} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  translateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
```

**Step 2: Verify no syntax errors**

```bash
node -c src/screens/TranslatorScreen.js
```

Expected: No output (success)

**Step 3: Commit**

```bash
git add src/screens/TranslatorScreen.js
git commit -m "feat: add TranslatorScreen with integrated components"
```

---

### Task 25: Update App.js to use TranslatorScreen

**Files:**
- Modify: `App.js`

**Step 1: Replace App.js content**

```javascript
import React from 'react';
import TranslatorScreen from './src/screens/TranslatorScreen';

export default function App() {
  return <TranslatorScreen />;
}
```

**Step 2: Verify no syntax errors**

```bash
node -c App.js
```

Expected: No output (success)

**Step 3: Commit**

```bash
git add App.js
git commit -m "feat: update App.js to render TranslatorScreen"
```

---

### Task 26: Verify MVP works on device

**Files:** N/A

**Step 1: Start Expo development server**

```bash
npx expo start
```

Expected: QR code displays in terminal

**Step 2: Test on device**

1. Scan QR code with Expo Go app on iPhone
2. App loads without errors
3. Test translation: "I feel happy" → tap Translate → "I fel hpy"
4. Toggle direction
5. Test reverse: "I fel hpy" → tap Translate → "I feel happy"

**Step 3: Stop server**

Press Ctrl+C in terminal

---

## Phase 3: Testing & Polish

**Note:** This phase needs to be fleshed out with proper TDD structure following the superpowers:writing-plans skill format. Tasks should include:
- Edge case testing (empty input, special characters, numbers, punctuation)
- Error boundary component
- Performance testing
- Accessibility testing
- All following the 5-step TDD cycle where applicable

---

## Phase 4: Demo Preparation

**Note:** This phase needs to be fleshed out with proper task structure following the superpowers:writing-plans skill format. Tasks should include:
- README documentation
- Screenshots and demo assets
- Presentation materials
- All with exact commands and verification steps

---

## Success Criteria

**MVP Complete When:**
- All Phase 0, 1, 2 tests pass
- App runs on iOS device via Expo Go
- Can translate English → Speedwriting
- Can translate Speedwriting → English
- 87-word dictionary loaded
- UI matches mockup design
- No crashes during normal use

**Ready for Phase 3 When:**
- All Phase 2 tasks complete
- All tests passing
- Manual device testing successful
