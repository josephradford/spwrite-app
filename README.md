# SPWrite

A mobile translator app for the Dearborn speedwriting system, built with React Native and Expo.

## Description

SPWrite is a bidirectional translator between English and speedwriting notation using Emma Dearborn's public domain speedwriting system. The app uses a data-driven architecture where translation rules live in JSON files rather than hardcoded logic.

## Prerequisites

- Node.js v16 or higher (tested with v22.19.0)
- npm v8 or higher (tested with v10.9.3)
- iOS device with Expo Go app installed, or Android device, or web browser

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josephradford/spwrite-app.git
   cd spwrite-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Expo development server:

```bash
npm start
```

This will open the Expo developer tools in your browser and display a QR code in the terminal.

### Running on Different Platforms

**iOS (iPhone/iPad):**
```bash
npm run ios
```
Or scan the QR code with the Camera app, then tap to open in Expo Go.

**Android:**
```bash
npm run android
```
Or scan the QR code with the Expo Go app.

**Web:**
```bash
npm run web
```

## Running Tests

Run the test suite:

```bash
npm test
```

**Note:** Currently no tests exist (Phase 0 complete, Phase 1+ in progress). Tests will be added using TDD approach.

## Project Structure

```
spwrite-app/
├── .github/
│   └── WORKFLOW.md          # GitHub Flow development workflow
├── data/                    # Dictionary and data files (Phase 1+)
├── src/
│   ├── services/           # Business logic services (Phase 1+)
│   ├── components/         # Reusable UI components (Phase 2+)
│   └── screens/            # Screen components (Phase 2+)
├── __tests__/
│   ├── services/           # Service tests (Phase 1+)
│   └── components/         # Component tests (Phase 2+)
├── App.js                  # Root component
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
├── PLAN.md                 # Implementation plan with TDD structure
└── README.md               # This file
```

## Development Workflow

This project follows [GitHub Flow](.github/WORKFLOW.md). See the workflow documentation for:
- Branch naming conventions
- Commit message format (Conventional Commits)
- Pull request process

## Tech Stack

- **React Native** 0.81.5
- **Expo** SDK 54
- **React** 19.1.0
- **Jest** 30.2.0 (testing framework)
- **React Native Testing Library** (component testing)

### Key Dependencies

- `@react-native-async-storage/async-storage` - Local data persistence
- `expo-clipboard` - Clipboard copy functionality
- `jest-expo` - Jest preset for Expo

## Architecture

SPWrite uses a data-driven translation architecture:

1. **Dictionary JSON** - Simple key-value mappings between English and speedwriting
2. **DictionaryService** - Loads dictionary and provides lookup methods with caching
3. **TranslationService** - Handles phrase translation using DictionaryService
4. **UI Components** - React Native components for the translator interface

See [CLAUDE.md](./CLAUDE.md) for detailed architecture documentation.

## Current Status

**Phase 0: Project Setup** ✅ Complete
- Development environment configured
- Expo project initialized
- Testing infrastructure ready
- Project structure created

**Phase 1-4:** In progress (see [PLAN.md](./PLAN.md) for detailed implementation plan)

## Contributing

This is a personal learning project demonstrating AI-assisted development with Test-Driven Development (TDD) practices. The implementation follows the plan in `PLAN.md` using the superpowers workflow.

## License

The Dearborn speedwriting system is in the public domain. This implementation is provided as-is for educational purposes.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
