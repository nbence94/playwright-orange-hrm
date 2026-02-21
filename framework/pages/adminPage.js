import BasePage from "./base";
import AdminTable from "./admin/adminTable.js";
import AdminSearchPanel from "./admin/adminSearchPanel";

export default class AdminPage extends BasePage {
    constructor(page) {
        super(page);

        // objects
        this.table = new AdminTable(page);
        this.searchPanel = new AdminSearchPanel(page);

        // elements
        this.systemUserTitle = this.page.locator("//h5");
    }

    async checkTitle() {
        await this.validations.isVisible(this.systemUserTitle, { errorMessage: '❌ System Users title cannot be found!' });
        this.logger.info(`✅ Admin Menu has been loaded successfully!`);
    }




    
}