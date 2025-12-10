# SPWrite UI Mockup

## Design Principles

1. **Mobile-first** - Optimized for iPhone (test) and Android
2. **Minimal & Clean** - No clutter, focus on translation task
3. **Fast** - Instant translation, no loading states (local data)
4. **Accessible** - Large touch targets, readable fonts
5. **Dark mode friendly** - Use system theme

---

## App Structure (MVP)

### Navigation
Single screen app for MVP - no navigation needed!

**Future:** Tabs for Translator | Rules | Settings

---

## Main Screen: Translator (MVP)

```
┌─────────────────────────────────────┐
│  ← SPWrite                    ≡     │  ← Header (back + menu for future)
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ English → Speedwriting   ⇅  │   │  ← Direction Toggle
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Type here...                │   │
│  │                             │   │  ← Input Field (multiline)
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│          [×] Clear                  │  ← Clear button (subtle)
│                                     │
│  ┌─────────────────────────────┐   │
│  │     Translate               │   │  ← Translate Button (prominent)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Translation appears here    │   │
│  │                             │   │  ← Output Field (read-only)
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│          [📋] Copy                  │  ← Copy button
│                                     │
│                                     │
│  📖 100 words loaded               │  ← Status/info (subtle)
└─────────────────────────────────────┘
```

---

## Component Breakdown

### Header
- **Left:** Back button (for future navigation)
- **Center:** "SPWrite" logo/title
- **Right:** Menu icon (hamburger) for future settings

### Direction Toggle
- **Design:** Pill-shaped toggle with swap icon
- **States:**
  - "English → Speedwriting"
  - "Speedwriting → English"
- **Interaction:** Tap to swap direction (with animation)

**Visual:**
```
┌────────────────────────────────┐
│ English → Speedwriting    ⇅   │  ← Tap ⇅ to swap
└────────────────────────────────┘

After tap:
┌────────────────────────────────┐
│ Speedwriting → English    ⇅   │
└────────────────────────────────┘
```

### Input Field
- **Type:** Multiline text input
- **Placeholder:** "Type here..." or context-aware:
  - English mode: "Type English words..."
  - Speedwriting mode: "Type speedwriting..."
- **Height:** 3-4 lines visible, expands up to 8 lines
- **Keyboard:** Default text keyboard
- **Auto-features:** Auto-capitalization OFF, auto-correct OFF (for speedwriting input)

### Clear Button
- **Position:** Small, subtle, top-right of input field
- **Icon:** ×
- **Behavior:** Clears input field only

### Translate Button
- **Design:** Large, prominent, primary color
- **Text:** "Translate" or "→" icon
- **Behavior:**
  - Translates input and shows in output field
  - Disabled if input is empty (greyed out)

### Output Field
- **Type:** Read-only text display (selectable for copy)
- **Styling:** Slightly different background to indicate read-only
- **Height:** Same as input field (mirrors it)
- **Empty state:** "Translation appears here" (grey placeholder)

### Copy Button
- **Position:** Small, subtle, bottom-right of output field
- **Icon:** 📋 clipboard
- **Behavior:**
  - Copies output text to clipboard
  - Shows brief toast/feedback: "Copied!"
  - Disabled if output is empty

### Status Bar (Bottom)
- **Position:** Bottom of screen, small text
- **Content:** "100 words loaded" or "Dictionary: v1.0.0"
- **Purpose:**
  - Shows user the dictionary is loaded
  - Future: Show sync status, last updated, etc.

---

## Interaction Flow

### Scenario 1: English → Speedwriting

1. User opens app
2. Default direction is "English → Speedwriting"
3. User types: "I feel happy today"
4. User taps "Translate"
5. Output shows: "I fel hpy 2dy"
6. User taps copy button
7. Toast shows "Copied!"

### Scenario 2: Speedwriting → English

1. User taps direction toggle (⇅)
2. Direction changes to "Speedwriting → English"
3. User types: "I fel hpy 2dy"
4. User taps "Translate"
5. Output shows: "I feel happy today"

### Scenario 3: Unknown Word

1. User types: "I love superfluous words"
2. Translation: "I lv superfluous wrds"
3. "superfluous" not in dictionary, passed through as-is
4. Future: Highlight unknown words or show warning

---

## Visual Design (React Native)

### Color Scheme

**Light Mode:**
- Background: #FFFFFF
- Primary: #007AFF (iOS blue) or custom brand color
- Text: #000000
- Subtle text: #8E8E93
- Input background: #F2F2F7
- Output background: #E5E5EA

**Dark Mode:**
- Background: #000000
- Primary: #0A84FF
- Text: #FFFFFF
- Subtle text: #8E8E93
- Input background: #1C1C1E
- Output background: #2C2C2E

### Typography
- **Header:** 20px, Bold
- **Body:** 17px, Regular
- **Input/Output:** 17px, Regular (monospace optional for speedwriting?)
- **Status:** 12px, Regular, Grey

### Spacing
- Screen padding: 16px
- Component spacing: 12px
- Button padding: 12px vertical, 20px horizontal

---

## Future Enhancements (Post-MVP)

### Live Translation (Future)
- Translate as user types (debounced)
- Show translation updating in real-time below input

### Word Highlighting (Future)
```
Input:  I feel happy today
        ↓  ↓    ↓     ↓
Output: I fel  hpy   2dy
```
Show which input word maps to which output word

### Unknown Word Indicator (Future)
```
I lv superfluous wrds
     ⚠️ not found
```

### Rules Tab (Phase 3)
```
┌─────────────────────────────────────┐
│         Rules Reference              │
├─────────────────────────────────────┤
│                                     │
│  🔍 Search rules...                 │
│                                     │
│  📚 All Rules (12)                  │
│  ├─ Omit Short Vowels               │
│  ├─ Keep Long Vowels                │
│  ├─ Common Abbreviations            │
│  ├─ Prefix: inter-/enter- (N)       │
│  └─ ...                             │
│                                     │
└─────────────────────────────────────┘

Tap a rule →

┌─────────────────────────────────────┐
│  ← Omit Short Vowels                │
├─────────────────────────────────────┤
│                                     │
│  Remove short vowels (a, e, i, o, u)│
│  from unstressed syllables.         │
│                                     │
│  Examples:                          │
│  • happy → hpy                      │
│  • important → imprtnt              │
│  • little → ltl                     │
│                                     │
└─────────────────────────────────────┘
```

### Settings Tab (Future)
```
┌─────────────────────────────────────┐
│           Settings                   │
├─────────────────────────────────────┤
│                                     │
│  ⚙️ Translation                     │
│  ├─ [Toggle] Live translate         │
│  ├─ [Toggle] Show unknown words     │
│  └─ [Toggle] Strict mode (. & 2)    │
│                                     │
│  📖 Dictionary                      │
│  ├─ Version: 1.0.0                  │
│  ├─ Words: 100                      │
│  └─ Last updated: 2025-12-10        │
│                                     │
│  ℹ️ About                           │
│  ├─ Version: 1.0.0                  │
│  ├─ Open Source (MIT)               │
│  └─ GitHub                          │
│                                     │
└─────────────────────────────────────┘
```

---

## Accessibility

### VoiceOver / TalkBack Support
- All buttons have accessible labels
- Input/output fields have hints
- Direction toggle announces current state

### Dynamic Type
- Support iOS Dynamic Type (text scaling)
- Use relative font sizes

### Touch Targets
- Minimum 44x44 pt touch targets
- Generous padding around interactive elements

---

## React Native Components

### Suggested Libraries

**Core:**
- React Native core components (TextInput, ScrollView, Pressable)
- No external UI library needed for MVP (keeps it simple)

**Optional:**
- `react-native-keyboard-aware-scroll-view` - Handle keyboard overlapping input
- `expo-clipboard` - Copy to clipboard API
- `@react-native-async-storage/async-storage` - For future user preferences

**No Need For:**
- Navigation library (single screen)
- State management library (useState/useContext sufficient)
- HTTP library (no backend)

---

## Component Structure (Code)

```
/src/components
  TranslatorScreen.js        # Main screen
  DirectionToggle.js         # Direction switcher
  TranslationInput.js        # Input field component
  TranslationOutput.js       # Output field component
  CopyButton.js             # Copy to clipboard button

/src/screens
  HomeScreen.js             # Container for TranslatorScreen

/src/services
  DictionaryService.js      # Dictionary loading/lookup
  TranslationService.js     # Translation logic
```

---

## Implementation Priority

### Phase 0 (MVP - Week 2)
- [x] Design mockup (this document)
- [ ] Implement TranslatorScreen layout
- [ ] Implement DirectionToggle
- [ ] Implement TranslationInput
- [ ] Implement TranslationOutput
- [ ] Wire up translation logic
- [ ] Test on iOS device

### Phase 1 (Week 3)
- [ ] Polish UI/UX
- [ ] Add copy button
- [ ] Add clear button
- [ ] Handle edge cases (empty input, etc.)
- [ ] Test on Android

### Future
- [ ] Live translation
- [ ] Rules tab
- [ ] Settings tab
- [ ] Unknown word highlighting

---

## Questions to Consider

1. **Keyboard behavior:** Should translate happen on "Return" key press? Or only via button?
   - **Decision:** Button only for MVP, add keyboard shortcut later

2. **Case handling:** Preserve original case in output?
   - **Decision:** Lowercase output for MVP (speedwriting is typically lowercase)

3. **Punctuation:** How to handle "I'm happy" → "I'm hpy" or "Im hpy"?
   - **Decision:** Preserve punctuation as-is for MVP, don't split contractions

4. **Special characters on keyboard:** Is typing "." and "&" easy on mobile?
   - **Decision:** User can type them, but also offer "t" and "and" as alternatives
   - **Future:** Settings toggle for "Strict mode" vs "Alpha-only mode"

---

## Demo Preparation (Week 4)

### What to Show
1. **Open app** - Show clean, simple interface
2. **Translate a journal entry:**
   - English: "Today I feel happy and grateful. I talked with my friend."
   - Speedwriting: "2dy I fel hpy & grtfl. I tlkd w/ my frnd."
3. **Reverse translate** - Swap direction, translate back
4. **Show code** - Highlight data-driven approach (JSON dictionary)
5. **Explain AI assistance** - How Claude helped research, design, code

### Key Talking Points
- Built in 4 weeks with AI assistance
- Public domain speedwriting system (Dearborn)
- 100-word starter dictionary for journaling
- Data-driven design (easy to expand)
- Mobile-first, no backend needed
- Open source (future)

---

Ready to build! 🚀
