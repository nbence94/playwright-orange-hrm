import BasePage from "../pages/base.js";
import Dropdown from "./dropDown.js";

export default class SearchPanel extends BasePage {
    constructor(page, searchItems) {
        super(page);
        this.searchItems = searchItems;


        // elements
        this.resetButton = this.page.getByRole('button', { name: /reset/i });
        this.searchButton = this.page.getByRole('button', { name: /search/i });

        this.item = (item) => this.page.locator(`//label[normalize-space()='${this.searchItems[item]}']/parent::div/parent::div`);
        this.inputItem = (item) => this.item(item).locator(`//input`);

    }

    async clickResetButton() {
        await this.actions.click(this.resetButton, { errorMessage: "❌ Failed to click 'Reset' button" });
        this.logger.info("🟦 Clicked 'Reset' button");
    }

    async clickSearchButton() {
        await this.actions.click(this.searchButton, { errorMessage: "❌ Failed to click 'Search' button" });
        this.logger.info("🟦 Clicked 'Search' button");
    }

    async _setSearchValue(item, value) {
        await this.actions.fill(this.inputItem(item), value, { errorMessage: "❌ Failed to set value for 'Search' field" });
        this.logger.info(`🟦 Filtering: '${value}' (${item})`);
    }
    
    async _selectDropdownValue(item, value) {
        const dropdown = new Dropdown(this.page, this.item(item).locator(`//div[@class='oxd-select-wrapper']`));
        await dropdown.select(value);
        this.logger.info(`🟦 Filtering: '${value}' (${item})`);
    }

}