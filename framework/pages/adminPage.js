import BasePage from "./base";

export default class AdminPage extends BasePage {
    constructor(page) {
        super(page);

        // elements
        this.systemUserTitle = this.page.locator("//h5");
    }

    async checkTitle() {
        await this.validations.isVisible(this.systemUserTitle, { errorMessage: '❌ System Users title cannot be found!' });
        this.logger.info(`✅ Admin Menu has been loaded successfully!`);
    }
}