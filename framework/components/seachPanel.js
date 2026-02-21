import BasePage from "../pages/basePage";

export default class SearchPanel extends BasePage {
    constructor(page, searchItems) {
        super(page);
        this.searchItems = searchItems;

        // elements
        this.resetButton = this.page.getByRole('button', { name: /reset/i });
        this.searchButton = this.page.getByRole('button', { name: /search/i });

        this.inputItem = (item) => this.page.locator(`//label[normalize-space()='${item}']/parent::div/parent::div//input`)

    }

    async clickResetButton() {
        await this.actions.click(this.resetButton, { errorMessage: "❌ Failed to click 'Reset' button" });
        this.logger.info("🟦 Clicked 'Reset' button");
    }

    async clickSearchButton() {
        await this.actions.click(this.searchButton, { errorMessage: "❌ Failed to click 'Search' button" });
        this.logger.info("🟦 Clicked 'Search' button");
    }

    async setSearchValue(item, value) {
        await this.actions.fill(this.inputItem(item), value, { errorMessage: "❌ Failed to set value for 'Search' field" });
        this.logger.info(`🟦 Set value '${value}' for '${item}'`);
    }

}


// //div[@role='listbox']