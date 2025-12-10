# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SPWrite is a React Native mobile translator app for the Dearborn speedwriting system. It provides bidirectional translation between English and speedwriting notation using a data-driven architecture where translation rules live in JSON files rather than hardcoded logic.

**Tech Stack:**
- React Native 0.81.5 with Expo 54
- React 19.1.0
- Testing: Jest with React Native Testing Library

## Common Commands

### Development
```bash
# Start Expo development server
npm start

# Start with specific platform
npm run ios
npm run android
npm run web
```

### Testing
```bash
# Run all tests
npm test
```

### Expo CLI
```bash
# Start development server
npx expo start

# Clear cache and restart
npx expo start --clear
```

## Architecture

### Data-Driven Translation System

The core architecture separates translation data from logic:

**Dictionary Data (`data/dictionary.json`):**
- Simple key-value structure: `{ "english_word": "speedwriting_abbreviation" }`
- Version tracked for future updates
- Currently ~100 words focused on journaling/emotions vocabulary
- Design allows future enhancement to array-based structure with rule annotations

**Service Layer:**

1. **DictionaryService** (`src/services/DictionaryService.js`)
   - Loads dictionary JSON at startup (singleton pattern)
   - Builds reverse index for bidirectional lookup (cached for performance)
   - Handles ambiguous speedwriting (multiple English words → same abbreviation)
   - Exposes: `translateToSpeedwriting()`, `translateToEnglish()`, `getWordCount()`, `getVersion()`

2. **TranslationService** (`src/services/TranslationService.js`)
   - Uses DictionaryService for word-level lookups
   - Handles phrase translation (splits by whitespace, preserves punctuation)
   - Unknown words pass through unchanged
   - Direction-aware: `'to-speedwriting'` or `'to-english'`

### Component Architecture

**Single Screen App:**
- `App.js` - Minimal root component, renders TranslatorScreen
- `TranslatorScreen.js` - Main screen with translation state management

**Reusable Components:**
- `DirectionToggle` - Toggle between translation directions
- `TranslationInput` - Text input with clear button
- `TranslationOutput` - Read-only output with clipboard copy functionality

### State Management

Simple React hooks-based state (no Redux/Context needed for MVP):
- `direction`: `'to-speedwriting'` | `'to-english'`
- `inputText`: User input string
- `outputText`: Translated result string

Translation happens on button press (not live/as-you-type).

## Key Design Patterns

### Reverse Index Caching
The DictionaryService builds a reverse lookup map on initialization to enable efficient speedwriting→English translation without iterating the entire dictionary for each word.

### Singleton Services
Both DictionaryService and TranslationService export singleton instances to ensure dictionary is loaded once and shared across components.

### Punctuation Preservation
TranslationService uses regex to separate punctuation from word cores, translating only the core while preserving surrounding punctuation: `"happy!"` → `"hpy!"`

### Graceful Degradation
Unknown words pass through untranslated rather than causing errors, allowing mixed English/speedwriting input.

## File Organization

```
/data
  dictionary.json          # Word mappings (English → speedwriting)

/src
  /services
    DictionaryService.js   # Dictionary loading & caching
    TranslationService.js  # Phrase translation logic
  /components
    DirectionToggle.js     # Direction switcher UI
    TranslationInput.js    # Input field with clear
    TranslationOutput.js   # Output field with copy
  /screens
    TranslatorScreen.js    # Main translator screen

App.js                     # Root component
```

## Testing Strategy

Jest configuration in `package.json` uses `jest-expo` preset with transform ignore patterns for React Native modules.

When writing tests:
- Import services directly to test translation logic
- Use `@testing-library/react-native` for component tests
- Test bidirectional translation, edge cases (empty input, punctuation), and unknown words

## Future Enhancement Path

The architecture supports planned Phase 2 enhancements:
- **Live translation** (as-you-type) - already implemented, just needs UI toggle
- **Rule explanations** - dictionary.json can migrate to array format with `rules` and `notes` fields
- **Ambiguity handling** - UI can show multiple translation options for ambiguous speedwriting
- **User custom words** - AsyncStorage integration with dictionary merging
- **Additional tabs** - Rules reference, Settings (already planned in design docs)

See `PLAN.md` and `DATA_STRUCTURE.md` for detailed roadmap and migration strategy.
