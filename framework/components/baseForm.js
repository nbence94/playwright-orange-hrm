import BasePage from "../pages/base";
import Dropdown from "./dropDown";
import AutoComplete from "./autoComplete";

export default class BaseForm extends BasePage {

    constructor(page, schema) {
        super(page);
        this.schema = schema;

        // elements
        this.item = (item) => this.page.locator(`//label[normalize-space()='${this.schema[item]}']/parent::div/parent::div`);
        this.inputItem = (item) => this.item(item).locator(`//input`);
    }

    async fill(item, value) {
        await this.actions.fill(this.inputItem(item), value, { errorMessage: "❌ Failed to set value for 'Search' field" });
        this.logger.info(`🟦 Set user data '${value}' (${item})`);
    }
    
    async select(item, value) {
        const dropdown = new Dropdown(this.page, this.item(item).locator(`//div[@class='oxd-select-wrapper']`));
        await dropdown.select(value);
        this.logger.info(`🟦 Set user data '${value}' (${item})`);
    }

    async autoComplete(item, value) {
        const autoComplete = new AutoComplete(this.page, this.item(item));
        await autoComplete.search(value);
        this.logger.info(`🟦 Set user data '${value}' (${item})`);
    }

}
