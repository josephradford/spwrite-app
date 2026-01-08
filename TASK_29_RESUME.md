# Task 29: Development Build - Resume Instructions

**Last Updated:** 2026-01-08 22:35
**Branch:** `task/development-build`
**Status:** Blocked - Awaiting iOS 26.2 platform installation

---

## Quick Resume Steps

After restarting your computer:

1. **Install iOS 26.2 Platform (REQUIRED FIRST)**
   - Open Xcode application
   - Go to: **Xcode > Settings > Components** (or Preferences > Components)
   - Find: **iOS 26.2** platform
   - Click: **"Get"** button to download and install
   - May need to restart computer after installation completes

2. **Switch to the correct branch**
   ```bash
   cd /Users/joeradford/dev/spwrite-app
   git checkout task/development-build
   ```

3. **Build to your iPhone 15**
   ```bash
   npx expo run:ios --device "DEVICE_ID_PLACEHOLDER"
   ```

4. **Test offline functionality**
   - Disconnect from your laptop
   - Verify app still works
   - App should persist and run independently

5. **When complete, tell Claude:** "Task 29 is complete, the development build works offline"

---

## What Was Already Done ✅

- ✅ Installed `expo-dev-client` package
- ✅ Generated native iOS project with `npx expo prebuild --platform ios`
- ✅ Created `ios/` folder with `SPWrite.xcworkspace`
- ✅ Identified target device: iPhone 15 (ID: DEVICE_ID_PLACEHOLDER)
- ✅ Attempted build (failed due to missing iOS 26.2 platform)
- ✅ Documented blocker in PLAN.md
- ✅ Committed and pushed changes to GitHub

---

## The Blocker Explained

**Problem:** Xcode 26.2 cannot find iOS 26.2 platform for building

**Error Message:**
```
xcodebuild: error: Unable to find a destination matching the provided destination specifier
iOS 26.2 is not installed. Please download and install the platform from Xcode > Settings > Components.
```

**Why This Happens:**
- Xcode 26.2 is installed
- iOS SDK 26.2 exists
- But iOS 26.2 **platform components** are not installed
- This is required even though your iPhone runs iOS 18.7.2
- The SDK can build apps targeting iOS 15.1+ (your deployment target)

**The Fix:**
- Manual GUI step to download iOS 26.2 platform via Xcode Settings
- This is a known issue with Xcode 26.x versions
- Reference: https://github.com/actions/runner-images/issues/13275

---

## Target Device Info

- **Device:** Joe's iPhone 15
- **iOS Version:** 18.7.2
- **Device ID:** DEVICE_ID_PLACEHOLDER
- **Project Deployment Target:** iOS 15.1+
- **Build SDK:** iOS 26.2

---

## Git Status

**Current Branch:** `task/development-build`
**Latest Commit:** `71060c7` - "docs: document Task 29 development build blocker"

**Branch Status:** Rebased on latest main (includes all Task 28 changes)

**Changes Include:**
- `package.json` / `package-lock.json` - Added expo-dev-client
- `app.json` - Added bundleIdentifier
- `PLAN.md` - Documented Task 29 progress and blocker
- `ios/` folder - Generated native project (gitignored)

---

## After Successful Build

Once the app is built and installed on your iPhone 15:

1. **Test offline** - Turn off WiFi, close laptop, verify app works
2. **Tell Claude** - "Task 29 complete, development build works"
3. **Claude will:**
   - Update PLAN.md to mark Task 29 complete
   - Clean up this resume file
   - Commit final documentation

---

## Troubleshooting

**If iOS 26.2 platform isn't showing in Xcode Components:**
- Try: Xcode > Check for Updates
- Or: Download from https://developer.apple.com/download/

**If build still fails after installing platform:**
- Try: `sudo xcode-select --reset`
- Or: Open `ios/SPWrite.xcworkspace` in Xcode and build from GUI

**If you need help:**
- Tell Claude: "I'm resuming Task 29, here's what happened: [describe issue]"
- Share any error messages you see

---

## Related Files

- **PLAN.md** - Full Task 29 documentation (lines 87-137)
- **package.json** - Contains expo-dev-client dependency
- **ios/SPWrite.xcworkspace** - Xcode workspace (generated, gitignored)

---

## Goals Recap

**Why we're doing this:**
- Expo Go requires constant connection to dev machine
- Development build = real app installed on device
- Works completely offline
- Persists between sessions
- Still supports hot reload when dev server running

**Success = App works on your iPhone 15 without laptop connected**
