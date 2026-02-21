import BasePage from "../pages/base.js";

export default class Dropdown extends BasePage {

  constructor(page, rootLocator) {
    super(page);
    this.root = rootLocator;
  }

  async _open() {
    await this.actions.click(this.root, { errorMessage: "❌ Failed to click 'Dropdown' button" });
    await this.page.waitForTimeout(1000);

    this.panel = this.page.locator('//div[@role="listbox"]');
    await this.panel.waitFor({ state: 'attached', timeout: 10000 });
    await this.panel.waitFor({ state: 'visible' });
  }

  async select(optionText) {
    await this._open();

    const option = this.panel.getByRole('option', { name: optionText });
    await this.actions.click(option, { errorMessage: "❌ Failed to click 'Dropdown' option" });
    await this.panel.waitFor({ state: 'hidden' });
  }

}
