import BasePage from "../pages/base";

export default class AutoComplete extends BasePage {

  constructor(page, root) {
    super(page);
    this.page = page;
    this.root = root;

    // elements
    this.input = this.root.locator('input');
    this.panel = this.page.locator('.oxd-autocomplete-dropdown');
  }

  async search(value) {

    await this.actions.fill(this.input, value, { errorMessage: '❌ Input field cannot be found! (AutoComplete)' });
    await this.page.waitForTimeout(1000);
    await this.validations.isVisible(this.panel, { errorMessage: '❌ Dropdown panel is not visible! (AutoComplete)' });
    await this.validations.isVisible(this.panel.getByText(value, { exact: false }).first(), { timeout: 6000, errorMessage: '❌ No user with this name (AutoComplete)' });
    const option = this.panel.getByText(value, { exact: false }).first();
    await this.actions.click(option, { errorMessage: '❌ No user with this name (AutoComplete)' });
    await this.validations.isHidden(this.panel, { errorMessage: '❌ Dropdown panel is not hidden! (AutoComplete)' });

    this.logger.info(`🟦 User '${value}' has been set`);
  }

}
