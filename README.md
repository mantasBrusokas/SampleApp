# SampleApp – E2E Tests (Detox)

---

## Why Detox?

| | Detox | Appium | Maestro | WebdriverIO |
|---|---|---|---|---|
| React Native support | ✅ Native | ⚠️ Generic | ✅ Good | ⚠️ Generic |
| Speed | ✅ Fast | ❌ Slow | ✅ Fast | ❌ Slow |
| Flakiness | ✅ Low | ❌ High | ✅ Low | ❌ High |
| JS/Jest integration | ✅ Built-in | ⚠️ Extra setup | ❌ YAML only | ⚠️ Extra setup |
| Setup complexity | ⚠️ Medium | ❌ High | ✅ Low | ❌ High |

Detox is purpose-built for React Native, runs without a WebDriver server (faster than Appium), auto-synchronizes with the JS thread (no manual `sleep` calls), and uses Jest natively – the same stack as the app itself.

---

## Project Structure

```
/SampleApp/
├── e2e/             
│   ├── app.test.js       # Main test suite
│   └── screens/        
│       └── AppScreen.js  # Page Object – selectors, actions, assertions
└── .detoxrc.js

```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | >= 18 |
| Xcode | >= 15 |
| applesimutils | latest |

```bash
brew tap wix/brew && brew install applesimutils
```

> **Note:** No global Detox CLI install needed – all commands use `npx detox`.

---

## Setup & Run (iOS – verified ✅)

### Step 1 – Set up React Native environment

Make sure your machine is ready for React Native development:
👉 https://reactnative.dev/docs/set-up-your-environment

### Step 2 – Clone and run the app

The tests run against this app: https://github.com/karolisov/SampleApp

```bash
git clone https://github.com/karolisov/SampleApp.git
cd SampleApp
npm install
cd ios && pod install && cd ..

# Start Metro bundler (keep this terminal open)
npx react-native start
```

Verify the app runs correctly on a simulator before proceeding:
```bash
npx react-native run-ios
```
### Step 3 – Install Detox
 
```bash
npm install detox --save-dev
```

### Step 4 – Add the e2e tests

Clone this repository's `e2e` folder into the app project:

```bash
# Inside SampleApp root directory
git clone https://github.com/mantasBrusokas/SampleApp.git e2e-tmp
cp -r e2e-tmp/e2e ./e2e
cp e2e-tmp/.detoxrc.js ./.detoxrc.js
rm -rf e2e-tmp
```

### Step 5 – Build and run tests

```bash
npx detox build --configuration ios.sim.debug
npx detox test --configuration ios.sim.debug
```

---

## Android (not verified ⚠️)

Android setup has not been verified. The configuration is included for reference based on Detox documentation.

Additional prerequisites:
- Android Studio
- Android SDK
- A running emulator (AVD: `Pixel_7_API_34`)

```bash
npx detox build --configuration android.emu.debug
npx detox test --configuration android.emu.debug
```

---

## Detox Configuration (`.detoxrc.js`)

```js
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/SampleApp.app',
      build: 'xcodebuild -workspace ios/SampleApp.xcworkspace -scheme SampleApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    // Android – not verified, included for reference
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [8081],
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 17 Pro',
      },
    },
    // Android – not verified, included for reference
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_7_API_34',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    // Android – not verified, included for reference
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
```

---

## Test Coverage

| Group | What is tested |
|---|---|
| Initial state | Header, counter, subheader, Button 1 color |
| Button 1 | Color changes on tap |
| Button 2 | Counter increments by 1 and across multiple taps |
| Button 3 | Header text changes, non-empty, unique each tap |
| Button 4 | Subheader toggle, correct text, multiple cycles |
| Button 5 | Resets all state simultaneously |

---

## Troubleshooting

```bash
# No devices found
xcrun simctl boot "iPhone 17 Pro"

# Metro not running
npx react-native start

# Pod issues
cd ios && pod repo update && pod install

# Build cache
npx detox clean-framework-cache && npx detox build-framework-cache
```

---

## Tech Stack

- [React Native](https://reactnative.dev/) – mobile framework
- [Detox](https://wix.github.io/Detox/) – E2E testing framework
- [Jest](https://jestjs.io/) – test runner
