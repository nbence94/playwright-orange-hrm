import BasePage from "../pages/base";

export default class Toast extends BasePage {

  constructor(page) {
    super(page);
    this.container = page.locator('.oxd-toast');
    this.message = page.locator('.oxd-toast-content-text');
  }

  async waitForVisible(timeout = 5000) {
    await this.validations.isVisible(this.container, { timeout, errorMessage: '❌ Toast cannot be found!' });
  }

  async waitForHidden(timeout = 10000) {
    await this.validations.isHidden(this.container, { timeout, errorMessage: '❌ Toast still visible!' });
  }

  async getText() {
    await this.waitForVisible();
    const text = await this.actions.readText(this.message, { errorMessage: '❌ Toast message cannot be read!' });
    return text.trim();
  }

  async getType() {
    await this.waitForVisible();

    const classes = await this.container.getAttribute('class');
    if (classes.includes('success')) return 'success';
    if (classes.includes('error')) return 'error';
    if (classes.includes('warning')) return 'warning';
    return 'info';
  }

  async checkIsSuccess(text) {
    const actual = await this.getText();
    const type = await this.getType();

    this.validations.includes(actual, text, { errorMessage: '❌ Toast message does not include expected text!' });
    this.validations.equal(type, 'success', { errorMessage: '❌ Toast is not success!' });

    await this.waitForHidden();
  }

  async checkIsError(text) {
    const actual = await this.getText();
    const type = await this.getType();

    this.validations.includes(actual, text, { errorMessage: '❌ Toast message does not include expected text!' });
    this.validations.equal(type, 'error', { errorMessage: '❌ Toast is not error!' });

    await this.waitForHidden();
  }

}
