# SPWrite MVP Implementation Plan

**Goal:** Build a mobile translator app for Dearborn speedwriting system using React Native + Expo

**Timeline:** 4 weeks (MVP demo-ready by early January 2026)

**Current Status:** Research & Design complete. Ready to implement.

---

## Phase 0: Project Setup (Week 1 - Days 1-2)

### Task 1: Verify Prerequisites (2 min)
**File:** N/A (command line)
**Action:**
```bash
node --version  # Should be v16+
npm --version   # Should be 8+
```
**Verification:** Both commands return version numbers without errors

### Task 2: Install Expo CLI (2 min)
**File:** N/A (command line)
**Action:**
```bash
npm install -g expo-cli
expo --version
```
**Verification:** Expo CLI version displays

### Task 3: Initialize Expo Project (3 min)
**File:** N/A (creates project structure)
**Action:**
```bash
cd /Users/joeradford/dev/spwrite-app
npx create-expo-app@latest . --template blank
```
**Verification:**
- `package.json` created
- `App.js` created
- `node_modules/` exists

### Task 4: Test Initial App (3 min)
**File:** N/A (command line)
**Action:**
```bash
npx expo start
```
**Verification:**
- QR code appears in terminal
- Can scan with Expo Go app on iPhone
- "Open up App.js to start working..." displays on phone

### Task 5: Install Additional Dependencies (2 min)
**File:** N/A (command line)
**Action:**
```bash
npm install @react-native-async-storage/async-storage
npx expo install expo-clipboard
```
**Verification:** Dependencies added to `package.json`

---

## Phase 1: Data Layer (Week 1 - Days 2-3)

### Task 6: Create Project Structure (2 min)
**Files:** Directory structure
**Action:**
```bash
mkdir -p data
mkdir -p src/services
mkdir -p src/components
mkdir -p src/screens
```
**Verification:** All directories exist via `ls -R src/`

### Task 7: Create Dictionary JSON (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/data/dictionary.json`
**Action:** Create JSON file with initial 100 words from RESEARCH.md
**Code:**
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
**Verification:** JSON is valid (no syntax errors when loaded)

### Task 8: Create DictionaryService (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/services/DictionaryService.js`
**Action:** Implement dictionary loading and lookup logic
**Code:**
```javascript
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
```
**Verification:** Import in test file and call `getWordCount()` - should return 100

### Task 9: Create TranslationService (4 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/services/TranslationService.js`
**Action:** Implement phrase translation logic
**Code:**
```javascript
import dictionaryService from './DictionaryService';

class TranslationService {
  translatePhrase(input, direction) {
    if (!input || input.trim() === '') {
      return '';
    }

    // Split by whitespace while preserving punctuation attached to words
    const words = input.split(/\s+/);

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

  translateToSpeedwriting(input) {
    return this.translatePhrase(input, 'to-speedwriting');
  }

  translateToEnglish(input) {
    return this.translatePhrase(input, 'to-english');
  }
}

const translationService = new TranslationService();

export default translationService;
```
**Verification:** Test with "I feel happy" → should return "I fel hpy"

---

## Phase 2: UI Components (Week 2)

### Task 10: Create DirectionToggle Component (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/components/DirectionToggle.js`
**Action:** Build toggle for translation direction
**Code:**
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
**Verification:** Component renders with text and icon

### Task 11: Create TranslationInput Component (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/components/TranslationInput.js`
**Action:** Build input field with clear button
**Code:**
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
**Verification:** Can type in field, clear button appears/works

### Task 12: Create TranslationOutput Component (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/components/TranslationOutput.js`
**Action:** Build read-only output field with copy button
**Code:**
```javascript
import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function TranslationOutput({ value }) {
  const handleCopy = async () => {
    if (value) {
      await Clipboard.setStringAsync(value);
      Alert.alert('Copied!', 'Translation copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.output}>
        <Text style={styles.text}>
          {value || 'Translation appears here'}
        </Text>
      </View>
      {value && (
        <Pressable style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyIcon}>📋</Text>
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
  copyButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 8,
  },
  copyIcon: {
    fontSize: 20,
  },
});
```
**Verification:** Displays text, copy button works

### Task 13: Create TranslatorScreen (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/screens/TranslatorScreen.js`
**Action:** Assemble all components into main screen
**Code:**
```javascript
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import DirectionToggle from '../components/DirectionToggle';
import TranslationInput from '../components/TranslationInput';
import TranslationOutput from '../components/TranslationOutput';
import translationService from '../services/TranslationService';
import dictionaryService from '../services/DictionaryService';

export default function TranslatorScreen() {
  const [direction, setDirection] = useState('to-speedwriting');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleToggleDirection = () => {
    setDirection(prev =>
      prev === 'to-speedwriting' ? 'to-english' : 'to-speedwriting'
    );
    // Clear output when direction changes
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

        <Text style={styles.status}>
          {dictionaryService.getWordCount()} words loaded • v{dictionaryService.getVersion()}
        </Text>
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
  status: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 'auto',
  },
});
```
**Verification:** Full translator interface displays and functions

### Task 14: Update App.js (2 min)
**File:** `/Users/joeradford/dev/spwrite-app/App.js`
**Action:** Replace default content with TranslatorScreen
**Code:**
```javascript
import React from 'react';
import TranslatorScreen from './src/screens/TranslatorScreen';

export default function App() {
  return <TranslatorScreen />;
}
```
**Verification:** App loads without errors

---

## Phase 3: Testing & Polish (Week 3)

### Task 15: Test on iOS Device (5 min)
**File:** N/A (testing)
**Action:**
1. Run `npx expo start`
2. Scan QR code with iPhone Expo Go app
3. Test translations:
   - "I feel happy today" → "I fel hpy 2dy"
   - "I fel hpy 2dy" → "I feel happy today"
4. Test UI interactions (toggle, clear, copy)
**Verification:** All features work on device

### Task 16: Handle Edge Cases (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/services/TranslationService.js`
**Action:** Improve handling of edge cases
- Empty input
- Whitespace-only input
- Multiple spaces between words
- Numbers and special characters
**Verification:** Edge cases handled gracefully

### Task 17: Add Error Boundary (optional) (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/src/components/ErrorBoundary.js`
**Action:** Catch and display errors gracefully
**Verification:** App doesn't crash on errors

---

## Phase 4: Demo Preparation (Week 4)

### Task 18: Create README (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/README.md`
**Action:** Document project, how to run, demo instructions
**Verification:** README is clear and complete

### Task 19: Take Screenshots (3 min)
**File:** N/A (assets)
**Action:** Capture screenshots of app in use
**Verification:** Screenshots saved for presentation

### Task 20: Prepare Demo Script (5 min)
**File:** `/Users/joeradford/dev/spwrite-app/DEMO.md`
**Action:** Write talking points and demo flow
**Verification:** Script is ready to present

---

## Success Criteria

**MVP Complete When:**
- ✅ App runs on iOS device via Expo Go
- ✅ Can translate English → Speedwriting
- ✅ Can translate Speedwriting → English
- ✅ 100-word dictionary loaded
- ✅ UI matches mockup design
- ✅ Copy to clipboard works
- ✅ No crashes during normal use

**Demo Ready When:**
- ✅ Can demonstrate live translation
- ✅ Screenshots/recordings available
- ✅ Can explain AI-assisted development process
- ✅ Can discuss data-driven architecture

---

## Risk Mitigation

**Risk 1:** Expo setup issues on Mac
- **Mitigation:** Follow official Expo docs, use npx instead of global install

**Risk 2:** Dictionary translations are incorrect
- **Mitigation:** Start with small set of verified words, expand carefully

**Risk 3:** UI looks bad on different screen sizes
- **Mitigation:** Test on multiple devices, use relative sizing

**Risk 4:** Running out of time before demo
- **Mitigation:** Focus on core translator only, skip polish if needed

---

## Future Work (Post-Demo)

- Live translation (as-you-type)
- Rules reference tab
- Settings tab
- Dark mode support
- Multi-system support (other speedwriting systems)
- User custom words
- Export to GitHub as open source
- Publish to App Store/Play Store

---

## Time Estimate

**Total implementation time:** 12-15 hours over 3 weeks
**Buffer time:** 1 week for testing and polish

**This plan is realistic for a 4-week hobby project timeline.**
