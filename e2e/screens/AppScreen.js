//
//  AppScreen.js
//  
//
//  Created by Mantas Brusokas on 17/03/2026.
//
const TIMEOUT = 3000;

class AppScreen {
  // Selectors

  get header() {
    return element(by.id('header'));
  }

  get subheader() {
    return element(by.id('subheader'));
  }

  get button1() {
    return element(by.id('button-1'));
  }

  get button2() {
    return element(by.id('button-2'));
  }

  get button3() {
    return element(by.id('button-3'));
  }

  get button4() {
    return element(by.id('button-4'));
  }

  get button5() {
    return element(by.id('button-5'));
  }

  // Actions

  async tapButton1() {
    await this.button1.tap();
  }

  async tapButton2() {
    await this.button2.tap();
  }

  async tapButton3() {
    await this.button3.tap();
  }

  async tapButton4() {
    await this.button4.tap();
  }

  async tapButton5() {
    await this.button5.tap();
  }

  async resetAll() {
    await this.tapButton5();
  }

  // Assertions

  async waitForHeader(text) {
    await waitFor(this.header)
      .toHaveText(text)
      .withTimeout(TIMEOUT);
  }

  async waitForSubheaderVisible() {
    await waitFor(this.subheader)
      .toBeVisible()
      .withTimeout(TIMEOUT);
  }

  async waitForSubheaderGone() {
    await waitFor(this.subheader)
      .not.toExist()
      .withTimeout(TIMEOUT);
  }

  async waitForButton2Count(count) {
    await waitFor(element(by.text(`Button 2 (${count})`)))
      .toBeVisible()
      .withTimeout(TIMEOUT);
  }

  // Getters

  async getHeaderText() {
    const attrs = await this.header.getAttributes();
    return attrs.text;
  }

  async getButton1ColorLabel() {
    const attrs = await this.button1.getAttributes();
    return attrs.label;
  }
}

module.exports = new AppScreen();
