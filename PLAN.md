# SPWrite MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a mobile translator app for Dearborn speedwriting system using React Native + Expo

**Architecture:** Data-driven translation engine with dictionary JSON, service layer for lookups, and React Native UI components. Tests verify behavior at each layer.

**Tech Stack:** React Native 0.81.5, Expo 54, Jest with React Native Testing Library

---

## ✅ Completed Phases

### Phase 0: Project Setup (Tasks 1-6)
**Status:** Complete | **Date:** 2025-12-11
- Task 1: Verify Node and npm
- Task 2: Initialize Expo Project
- Task 3: Install Test Dependencies
- Task 4: Install App Dependencies
- Task 5: Create Project Directory Structure
- Task 6: Set up GitHub Flow workflow

**Commits:** 31b4842, c544fba, 7d38ec3, 1c8f210, d4a7e81, 4939860

---

### Phase 1: Data Layer - TDD (Tasks 7-18)
**Status:** Complete | **Date:** 2025-12-11 to 2026-01-03

**DictionaryService** (Tasks 7-13):
- Task 7: Create Dictionary JSON (100-word dictionary)
- Task 8: Set up GitHub Actions for automated testing
- Task 9: DictionaryService loads dictionary (e876e5f)
- Task 10: DictionaryService counts words (f92d6e2)
- Task 11: DictionaryService translates English to speedwriting (44ba8b9)
- Task 12: DictionaryService builds reverse index (30bbb8b)
- Task 13: DictionaryService translates speedwriting to English (26bd3d8)

**TranslationService** (Tasks 14-18):
- Task 14: TranslationService translates empty input (65927df)
- Task 15: TranslationService translates single word to speedwriting (869a4e9)
- Task 16: TranslationService translates phrase to speedwriting (24d5267)
- Task 17: TranslationService translates to English (24d5267)
- Task 18: TranslationService preserves punctuation (24d5267)

**Tests:** All 34 tests passing

---

### Phase 2: UI Components - TDD (Tasks 19-26)
**Status:** Complete | **Date:** 2026-01-03

**Components** (Tasks 19-23):
- Task 19: DirectionToggle renders correct text (b9d9389)
- Task 20: DirectionToggle calls onToggle (49f3e05)
- Task 21: TranslationInput renders with placeholder (6cf8d6b)
- Task 22: TranslationInput shows clear button when has text (efad242)
- Task 23: TranslationOutput displays text (edc1889)

**Integration** (Tasks 24-26):
- Task 24: Create TranslatorScreen (0d4abb2)
- Task 25: Update App.js to use TranslatorScreen (13581c2)
- Task 26: Verify MVP works on device ✅

---

### Phase 3: Testing & Polish (Tasks 27-28)
**Status:** In Progress

- Task 27: Add keyboard dismiss functionality ✅ (501c8d5)
  - Keyboard dismisses on "Done" button press
  - Auto-dismiss when Translate button pressed
  - Tap outside input area to dismiss keyboard

---

## 🚧 Active Work

### Task 28: Real-Time Translation with Character Limits

**Goal:** Translate automatically as user types (like Google Translate), with performance safeguards

**Motivation:**
- Current UX requires pressing "Translate" button (outdated)
- Google Translate translates in real-time as you type
- Users expect instant feedback in modern translation apps
- Need safeguards to prevent performance issues with large text

**Changes Overview:**
1. Remove "Translate" button
2. Add real-time translation with debouncing (300ms delay)
3. Add 5,000 character limit (matches Google Translate standard)
4. Add character counter UI
5. Handle paste events gracefully

**Research:**
- Google Translate uses 5,000 character limit ([source](https://www.techmymoney.com/2016/12/10/google-translate-character-limit/))
- Cloud Translation API recommends 5K characters per request ([source](https://cloud.google.com/translate/quotas))
- Real-time translation with debouncing is industry standard

---

#### Subtask 28.1: Add Character Counter Component (TDD)

**Files:**
- Create: `src/components/CharacterCounter.js`
- Create: `__tests__/components/CharacterCounter.test.js`

**Step 1: Write failing test**

Create `__tests__/components/CharacterCounter.test.js`:

```javascript
import React from 'react';
import { render } from '@testing-library/react-native';
import CharacterCounter from '../../src/components/CharacterCounter';

describe('CharacterCounter', () => {
  test('displays current character count', () => {
    const { getByText } = render(<CharacterCounter current={150} max={5000} />);
    expect(getByText('150 / 5000')).toBeTruthy();
  });

  test('displays zero when current is 0', () => {
    const { getByText } = render(<CharacterCounter current={0} max={5000} />);
    expect(getByText('0 / 5000')).toBeTruthy();
  });

  test('applies warning style when approaching limit (>4500)', () => {
    const { getByText } = render(<CharacterCounter current={4600} max={5000} />);
    const text = getByText('4600 / 5000');
    expect(text.props.style).toMatchObject(
      expect.objectContaining({ color: '#FF9500' })
    );
  });

  test('applies error style when at or over limit', () => {
    const { getByText } = render(<CharacterCounter current={5000} max={5000} />);
    const text = getByText('5000 / 5000');
    expect(text.props.style).toMatchObject(
      expect.objectContaining({ color: '#FF3B30' })
    );
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- CharacterCounter.test.js
```

Expected: FAIL with "Cannot find module"

**Step 3: Write minimal implementation**

Create `src/components/CharacterCounter.js`:

```javascript
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function CharacterCounter({ current, max }) {
  const percentage = (current / max) * 100;

  let textStyle = styles.normal;
  if (current >= max) {
    textStyle = styles.error;
  } else if (percentage > 90) {
    textStyle = styles.warning;
  }

  return (
    <Text style={[styles.counter, textStyle]}>
      {current} / {max}
    </Text>
  );
}

const styles = StyleSheet.create({
  counter: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  normal: {
    color: '#8E8E93',
  },
  warning: {
    color: '#FF9500',
  },
  error: {
    color: '#FF3B30',
  },
});
```

**Step 4: Run test to verify it passes**

```bash
npm test -- CharacterCounter.test.js
```

Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add __tests__/components/CharacterCounter.test.js src/components/CharacterCounter.js
git commit -m "feat: add CharacterCounter component with limit warnings"
```

---

#### Subtask 28.2: Add Character Limit to TranslationInput (TDD)

**Files:**
- Modify: `src/components/TranslationInput.js`
- Modify: `__tests__/components/TranslationInput.test.js`

**Step 1: Write failing tests**

Add to `__tests__/components/TranslationInput.test.js`:

```javascript
import CharacterCounter from '../../src/components/CharacterCounter';

describe('character limit functionality', () => {
  test('shows character counter when maxLength provided', () => {
    const { UNSAFE_getByType } = render(
      <TranslationInput
        value="hello"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
        maxLength={5000}
      />
    );
    expect(UNSAFE_getByType(CharacterCounter)).toBeTruthy();
  });

  test('does not show character counter when maxLength not provided', () => {
    const { UNSAFE_queryByType } = render(
      <TranslationInput
        value="hello"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(UNSAFE_queryByType(CharacterCounter)).toBeNull();
  });

  test('prevents typing beyond maxLength', () => {
    const mockChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TranslationInput
        value="a".repeat(5000)
        onChangeText={mockChange}
        placeholder="Type here..."
        onClear={() => {}}
        maxLength={5000}
      />
    );

    const input = getByPlaceholderText('Type here...');
    expect(input.props.maxLength).toBe(5000);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslationInput.test.js
```

Expected: FAIL

**Step 3: Write minimal implementation**

Update `src/components/TranslationInput.js`:

```javascript
import CharacterCounter from './CharacterCounter';

export default function TranslationInput({
  value,
  onChangeText,
  placeholder,
  onClear,
  enableAutocorrect = false,
  maxLength
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        autoCapitalize={enableAutocorrect ? "sentences" : "none"}
        autoCorrect={enableAutocorrect}
        returnKeyType="done"
        blurOnSubmit={true}
        maxLength={maxLength}
      />
      {value.length > 0 && (
        <Pressable style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}
      {maxLength && (
        <CharacterCounter current={value.length} max={maxLength} />
      )}
    </View>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslationInput.test.js
```

Expected: PASS (all tests including 3 new ones)

**Step 5: Commit**

```bash
git add __tests__/components/TranslationInput.test.js src/components/TranslationInput.js
git commit -m "feat: add character limit and counter to TranslationInput"
```

---

#### Subtask 28.3: Add Real-Time Translation with Debouncing (TDD)

**Files:**
- Modify: `src/screens/TranslatorScreen.js`
- Modify: `__tests__/screens/TranslatorScreen.test.js`

**Step 1: Write failing tests**

Add to `__tests__/screens/TranslatorScreen.test.js`:

```javascript
describe('real-time translation', () => {
  jest.useFakeTimers();

  test('translates automatically after debounce delay', () => {
    const { getByPlaceholderText, getByText } = render(<TranslatorScreen />);

    const input = getByPlaceholderText('Type English words...');
    fireEvent.changeText(input, 'happy');

    // Should not translate immediately
    expect(() => getByText('hpy')).toThrow();

    // Fast-forward time past debounce
    jest.advanceTimersByTime(300);

    // Should now show translation
    expect(getByText('hpy')).toBeTruthy();
  });

  test('debounce resets when user continues typing', () => {
    const { getByPlaceholderText, getByText } = render(<TranslatorScreen />);

    const input = getByPlaceholderText('Type English words...');
    fireEvent.changeText(input, 'h');

    jest.advanceTimersByTime(100);
    fireEvent.changeText(input, 'ha');

    jest.advanceTimersByTime(100);
    fireEvent.changeText(input, 'hap');

    // Should not have translated yet (debounce keeps resetting)
    expect(() => getByText('hpy')).toThrow();

    // Fast-forward full debounce time
    jest.advanceTimersByTime(300);

    // Now should show partial match or original
    expect(input.props.value).toBe('hap');
  });

  test('clears translation when input is cleared', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TranslatorScreen />);

    const input = getByPlaceholderText('Type English words...');
    fireEvent.changeText(input, 'happy');
    jest.advanceTimersByTime(300);

    expect(getByText('hpy')).toBeTruthy();

    // Clear input
    fireEvent.changeText(input, '');
    jest.advanceTimersByTime(300);

    // Translation should be cleared
    expect(queryByText('hpy')).toBeNull();
  });

  test('does not show Translate button', () => {
    const { queryByText } = render(<TranslatorScreen />);
    expect(queryByText('Translate')).toBeNull();
  });

  jest.useRealTimers();
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- TranslatorScreen.test.js
```

Expected: FAIL (Translate button still exists, no auto-translation)

**Step 3: Write minimal implementation**

Update `src/screens/TranslatorScreen.js`:

```javascript
import React, { useState, useEffect, useRef } from 'react';

const DEBOUNCE_DELAY = 300; // ms
const MAX_CHARACTERS = 5000;

export default function TranslatorScreen() {
  const [direction, setDirection] = useState('to-speedwriting');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const debounceTimer = useRef(null);

  // Real-time translation with debouncing
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      if (!inputText.trim()) {
        setOutputText('');
        return;
      }

      const result = translationService.translatePhrase(inputText, direction);
      setOutputText(result);
    }, DEBOUNCE_DELAY);

    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputText, direction]);

  const handleToggleDirection = () => {
    setDirection(prev =>
      prev === 'to-speedwriting' ? 'to-english' : 'to-speedwriting'
    );
    setOutputText('');
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
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
              enableAutocorrect={direction === 'to-speedwriting'}
              maxLength={MAX_CHARACTERS}
            />

            <TranslationOutput value={outputText} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Remove translateButton styles from StyleSheet
```

**Step 4: Run test to verify it passes**

```bash
npm test -- TranslatorScreen.test.js
```

Expected: PASS (all tests)

**Step 5: Run all tests**

```bash
npm test
```

Expected: All tests passing

**Step 6: Commit**

```bash
git add __tests__/screens/TranslatorScreen.test.js src/screens/TranslatorScreen.js
git commit -m "feat: add real-time translation with debouncing, remove Translate button"
```

---

#### Subtask 28.4: Manual Testing & Verification

**Step 1: Start dev server**

```bash
npx expo start
```

**Step 2: Test on device**

1. Open app on iPhone
2. Type "I feel happy" slowly
3. Verify translation appears after ~300ms pause
4. Verify character counter shows "14 / 5000"
5. Toggle direction
6. Type "I fel hpy"
7. Verify reverse translation works
8. Try pasting 6000 characters - should truncate at 5000
9. Verify character counter turns orange near limit
10. Verify character counter turns red at limit

**Step 3: Performance testing**

1. Type rapidly - should not lag
2. Paste 5000 character text - should handle smoothly
3. Toggle direction with 5000 chars - should respond quickly

---

#### Subtask 28.5: Update PLAN.md Documentation

Mark task complete and update success criteria.

---

### Implementation Summary

**What gets removed:**
- "Translate" button and its onPress handler
- Manual translation trigger

**What gets added:**
- CharacterCounter component with color-coded warnings
- Character limit (5000 chars) on TextInput
- Real-time translation using useEffect + debouncing
- Character counter display under input field

**Performance optimizations:**
- 300ms debounce prevents excessive re-renders
- 5000 character limit prevents app freeze
- maxLength on TextInput prevents paste overflow

**UX improvements:**
- Instant feedback (matches Google Translate)
- Visual character limit warnings
- Cleaner UI without button
- Faster workflow

---

### Future Tasks (To Be Detailed)

**Note:** These tasks need to be fleshed out with proper TDD structure following the superpowers:writing-plans skill format:

- Edge case testing (empty input, special characters, numbers, punctuation)
- Error boundary component
- Performance testing
- Accessibility testing
- All following the 5-step TDD cycle where applicable

---

## 📋 Phase 4: Demo Preparation

**Note:** This phase needs to be fleshed out with proper task structure following the superpowers:writing-plans skill format. Tasks should include:

- README documentation
- Screenshots and demo assets
- Presentation materials
- All with exact commands and verification steps

---

## Success Criteria

**MVP Complete When:**
- ✅ All Phase 0, 1, 2 tests pass (34/34 passing)
- ✅ App runs on iOS device via Expo Go
- ✅ Can translate English → Speedwriting
- ✅ Can translate Speedwriting → English
- ✅ 100-word dictionary loaded
- ✅ UI matches mockup design
- ✅ No crashes during normal use
- ✅ Keyboard dismisses properly

**Current Status:** MVP Complete! 🎉

**Next Steps:**
- Define and implement Phase 3 future tasks
- Plan Phase 4 demo preparation

---

## Quick Reference

**Run Tests:**
```bash
npm test
```

**Start Dev Server:**
```bash
npx expo start
```

**View Task Details:**
For detailed implementation steps of completed tasks, see git history:
```bash
git log --oneline --all
```
