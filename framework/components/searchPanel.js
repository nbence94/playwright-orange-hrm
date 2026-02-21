import BaseForm from "./baseForm.js";

export default class SearchPanel extends BaseForm {
    constructor(page, searchItems) {
        super(page, searchItems);
        this.searchItems = searchItems;

        // elements
        this.resetButton = this.page.getByRole('button', { name: /reset/i });
        this.searchButton = this.page.getByRole('button', { name: /search/i });

    }

    async clickResetButton() {
        await this.actions.click(this.resetButton, { errorMessage: "❌ Failed to click 'Reset' button" });
        this.logger.info("🟦 Clicked 'Reset' button");
    }

    async clickSearchButton() {
        await this.actions.click(this.searchButton, { errorMessage: "❌ Failed to click 'Search' button" });
        this.logger.info("🟦 Clicked 'Search' button");
    }

}