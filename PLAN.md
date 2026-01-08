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
**Status:** Complete

- Task 27: Add keyboard dismiss functionality ✅ (501c8d5)
  - Keyboard dismisses on "Done" button press
  - Auto-dismiss when Translate button pressed
  - Tap outside input area to dismiss keyboard

- Task 28: Real-time translation with character limits ✅ (684730e, 4a71dab, 4adc9c5)
  - CharacterCounter component with color-coded warnings
  - 5,000 character limit (matches Google Translate)
  - Real-time translation with 300ms debouncing
  - Removed Translate button
  - All 44 tests passing

---

## 🚧 Active Work

### Task 29: Create Development Build for Offline Testing

**Goal:** Create a standalone development build using `expo run:ios` that works offline without Expo Go

**Motivation:**
- Expo Go requires staying connected to dev machine
- Expo Go requires same WiFi network
- Development build installs as real app on device
- Can test offline, persists between sessions
- Still supports hot reloading when dev server running

**Target Device:**
- Joe's iPhone 15 running iOS 18.7.2
- Project deployment target: iOS 15.1+
- Building with Xcode 26.2 / iOS SDK 26.2

**Progress:**

✅ **Completed Steps:**
1. Installed `expo-dev-client` (required for development builds)
2. Generated native iOS project with `npx expo prebuild --platform ios`
3. Created `ios/` folder with SPWrite.xcworkspace
4. Identified target device: iPhone 15 (ID: DEVICE_ID_PLACEHOLDER)

🚧 **Current Blocker:**

**Issue:** Xcode cannot find iOS 26.2 platform for building
**Error:** `iOS 26.2 is not installed. Please download and install the platform from Xcode > Settings > Components.`

This affects both simulators and physical devices. The iOS SDK 26.2 can build apps targeting iOS 15.1+ (will run on iPhone 15's iOS 18.7.2), but Xcode needs the iOS 26.2 platform components installed first.

**Fix Required (Manual Step):**
1. Open Xcode application
2. Go to **Xcode > Settings > Components** (or Preferences > Components)
3. Find **iOS 26.2** platform in the list
4. Click **"Get"** button to download and install
5. May need to restart computer after installation
6. Then retry: `npx expo run:ios --device "DEVICE_ID_PLACEHOLDER"`

**References:**
- [Expo Development Builds Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
- [Downloading and installing additional Xcode components](https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components)
- Known issue: [macOS 15 / Xcode 26.1: iOS platform not installed](https://github.com/actions/runner-images/issues/13275)

**Next Steps After Platform Install:**
1. Build and install on iPhone 15: `npx expo run:ios --device "DEVICE_ID_PLACEHOLDER"`
2. Test offline functionality (disconnect from dev machine)
3. Verify app persists and works without connection
4. Document final build process

**Status:** Blocked - Awaiting manual iOS 26.2 platform installation via Xcode GUI

---

### Future Tasks (To Be Detailed)

**Note:** These tasks need to be fleshed out with proper TDD structure following the superpowers:writing-plans skill format:

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
- ✅ All Phase 0, 1, 2, 3 tests pass (44/44 passing)
- ✅ App runs on iOS device via Expo Go
- ✅ Can translate English → Speedwriting
- ✅ Can translate Speedwriting → English
- ✅ 196-word dictionary loaded (expanded from 100)
- ✅ UI matches mockup design
- ✅ No crashes during normal use
- ✅ Keyboard dismisses properly
- ✅ Real-time translation with debouncing
- ✅ 5,000 character limit with visual counter

**Current Status:** MVP Complete! Phase 3 Complete! 🎉

**Next Steps:**
- Manual device testing for Task 28
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
