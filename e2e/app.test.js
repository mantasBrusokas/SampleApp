const { expect: jestExpect } = require('@jest/globals');
const AppScreen = require('./screens/AppScreen');
 
const INITIAL_HEADER = 'Welcome!';
const INITIAL_BUTTON1_LABEL = 'Button 1 color: #2196F3';
const SUBHEADER_TEXT = 'This is a subheader';
 
describe('SampleApp – E2E', () => {
 
  beforeAll(async () => {
    await device.launchApp();
  });
 
  afterAll(async () => {
    await device.terminateApp();
  });
 
  beforeEach(async () => {
    await device.reloadReactNative();
  });
 
  // Initial State
 
  describe('Initial state', () => {
 
    it('renders header with default text', async () => {
      await AppScreen.waitForHeader(INITIAL_HEADER);
    });
 
    it('renders Button 2 counter starting at 1', async () => {
      await AppScreen.waitForButton2Count(1);
    });
 
    it('does not render subheader by default', async () => {
      await AppScreen.waitForSubheaderGone();
    });
 
    it('renders Button 1 with default color', async () => {
      const label = await AppScreen.getButton1ColorLabel();
      jestExpect(label).toBe(INITIAL_BUTTON1_LABEL);
    });
 
  });
 
  // Button 1 – Color Change
 
  describe('Button 1 – color change', () => {
 
    it('changes color on tap', async () => {
      const before = await AppScreen.getButton1ColorLabel();
      await AppScreen.tapButton1();
      const after = await AppScreen.getButton1ColorLabel();
      jestExpect(before).not.toBe(after);
    });
 
    it('changes color on each subsequent tap', async () => {
      await AppScreen.tapButton1();
      const first = await AppScreen.getButton1ColorLabel();
 
      await AppScreen.tapButton1();
      const second = await AppScreen.getButton1ColorLabel();
 
      jestExpect(first).not.toBe(second);
    });
 
  });
 
  // Button 2 – Counter
 
  describe('Button 2 – counter increment', () => {
 
    it('increments counter by 1 on tap', async () => {
      await AppScreen.waitForButton2Count(1);
      await AppScreen.tapButton2();
      await AppScreen.waitForButton2Count(2);
    });
 
    it('increments counter correctly across multiple taps', async () => {
      const taps = 5;
      for (let i = 0; i < taps; i++) {
        await AppScreen.tapButton2();
      }
      await AppScreen.waitForButton2Count(taps + 1);
    });
 
  });
 
  // Button 3 – Header Text
 
  describe('Button 3 – header text change', () => {
 
    it('changes header text on tap', async () => {
      const before = await AppScreen.getHeaderText();
      await AppScreen.tapButton3();
      const after = await AppScreen.getHeaderText();
      jestExpect(before).not.toBe(after);
    });
 
    it('sets a non-empty header text', async () => {
      await AppScreen.tapButton3();
      const text = await AppScreen.getHeaderText();
      jestExpect(text).toBeTruthy();
      jestExpect(text.length).toBeGreaterThan(0);
    });
 
    it('generates unique text on each tap', async () => {
      await AppScreen.tapButton3();
      const first = await AppScreen.getHeaderText();
 
      await AppScreen.tapButton3();
      const second = await AppScreen.getHeaderText();
 
      jestExpect(first).not.toBe(second);
    });
 
  });
 
  // Button 4 – Subheader Toggle
 
  describe('Button 4 – subheader toggle', () => {
 
    it('shows subheader on first tap', async () => {
      await AppScreen.waitForSubheaderGone();
      await AppScreen.tapButton4();
      await AppScreen.waitForSubheaderVisible();
    });
 
    it('shows correct subheader text', async () => {
      await AppScreen.tapButton4();
      await expect(AppScreen.subheader).toHaveText(SUBHEADER_TEXT);
    });
 
    it('hides subheader on second tap', async () => {
      await AppScreen.tapButton4();
      await AppScreen.waitForSubheaderVisible();
 
      await AppScreen.tapButton4();
      await AppScreen.waitForSubheaderGone();
    });
 
    it('toggles correctly across multiple cycles', async () => {
      const cycles = 3;
      for (let i = 0; i < cycles; i++) {
        await AppScreen.tapButton4();
        await AppScreen.waitForSubheaderVisible();
 
        await AppScreen.tapButton4();
        await AppScreen.waitForSubheaderGone();
      }
    });
 
  });
 
  // Button 5 – Reset
 
  describe('Button 5 – reset all state', () => {
 
    it('resets header text to default', async () => {
      await AppScreen.tapButton3();
      const changed = await AppScreen.getHeaderText();
      jestExpect(changed).not.toBe(INITIAL_HEADER);
 
      await AppScreen.resetAll();
      await AppScreen.waitForHeader(INITIAL_HEADER);
    });
 
    it('resets counter to 1', async () => {
      await AppScreen.tapButton2();
      await AppScreen.tapButton2();
      await AppScreen.waitForButton2Count(3);
 
      await AppScreen.resetAll();
      await AppScreen.waitForButton2Count(1);
    });
 
    it('hides subheader', async () => {
      await AppScreen.tapButton4();
      await AppScreen.waitForSubheaderVisible();
 
      await AppScreen.resetAll();
      await AppScreen.waitForSubheaderGone();
    });
 
    it('resets Button 1 color to default', async () => {
      await AppScreen.tapButton1();
      const changed = await AppScreen.getButton1ColorLabel();
      jestExpect(changed).not.toBe(INITIAL_BUTTON1_LABEL);
 
      await AppScreen.resetAll();
      const reset = await AppScreen.getButton1ColorLabel();
      jestExpect(reset).toBe(INITIAL_BUTTON1_LABEL);
    });
 
    it('resets all state simultaneously', async () => {
      await AppScreen.tapButton1();
      await AppScreen.tapButton2();
      await AppScreen.tapButton2();
      await AppScreen.tapButton3();
      await AppScreen.tapButton4();
 
      await AppScreen.resetAll();
 
      await AppScreen.waitForHeader(INITIAL_HEADER);
      await AppScreen.waitForButton2Count(1);
      await AppScreen.waitForSubheaderGone();
 
      const colorLabel = await AppScreen.getButton1ColorLabel();
      jestExpect(colorLabel).toBe(INITIAL_BUTTON1_LABEL);
    });
 
  });
 
});
