# SampleApp – E2E Tests (Detox)


## Framework Choice – Why Detox?

Detox was chosen because it is purpose-built for React Native, provides fast and reliable test execution, integrates naturally with Jest, and supports patterns like Page Object – making it the most suitable framework for this task.

---

## Project Structure

```
e2e/
├── app.test.js          # Main test suite
└── screens/
    └── AppScreen.js     # Page Object – selectors, actions, assertions
```

---

## Prerequisites

Make sure you have the following installed before running the tests:

| Tool | Version | Notes |
|---|---|---|
| Node.js | >= 18 | [nodejs.org](https://nodejs.org) |
| npm | >= 9 | Comes with Node.js |
| Xcode | >= 15 | macOS only – required for iOS simulator |
| Xcode CLI Tools | latest | `xcode-select --install` |
| applesimutils | latest | Required by Detox for iOS |
| React Native CLI | latest | `npm install -g react-native-cli` |

Install `applesimutils`:
```bash
brew tap wix/brew
brew install applesimutils
```

Install Detox CLI globally:
```bash
npm install -g detox-cli
```

---

## Setup

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Install iOS pods

```bash
cd ios && pod install && cd ..
```

---

## Building the App for Tests

Before running tests, you need to build the app in test configuration.

### iOS (Simulator)

```bash
detox build --configuration ios.sim.debug
```

### Android (Emulator)

```bash
detox build --configuration android.emu.debug
```

---

## Running the Tests

### iOS

```bash
detox test --configuration ios.sim.debug
```

### Android

```bash
detox test --configuration android.emu.debug
```
---

## Test Coverage

| Test Group | What is tested |
|---|---|
| **Initial state** | Default header text, counter starts at 1, subheader hidden, Button 1 default color |
| **Button 1** | Color changes on tap, changes on each tap |
| **Button 2** | Counter increments by 1, increments correctly across multiple taps |
| **Button 3** | Header text changes, non-empty result, unique value each tap |
| **Button 4** | Subheader appears/disappears on toggle, correct text, multiple cycles |
| **Button 5** | Resets header, counter, subheader, Button 1 color, all state simultaneously |

---

## Detox Configuration

Detox configuration is defined in `.detoxrc.js`

Example `.detoxrc.js`:

```js
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/SampleApp.app',
      build: 'xcodebuild -workspace ios/SampleApp.xcworkspace -scheme SampleApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/SampleApp.app',
      build: 'xcodebuild -workspace ios/SampleApp.xcworkspace -scheme SampleApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 17 Pro'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    }
  }
};

```

---

- [Detox](https://wix.github.io/Detox/) – E2E testing framework
- [Jest](https://jestjs.io/) – test runner
