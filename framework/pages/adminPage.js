import BasePage from "./base";
import AdminTable from "./admin/adminTable.js";
import AdminSearchPanel from "./admin/adminSearchPanel";
import AdminAddUserForm from "./admin/adminAddUser.js";

export default class AdminPage extends BasePage {
    constructor(page) {
        super(page);

        // objects
        this.table = new AdminTable(page);
        this.searchPanel = new AdminSearchPanel(page);
        this.addUser = new AdminAddUserForm(page);

        // elements
        this.systemUserTitle = this.page.locator("//h5");
        this.addUserButton = this.page.locator("//button[normalize-space()='Add']");
    }

    async checkTitle() {
        await this.validations.isVisible(this.systemUserTitle, { errorMessage: '❌ System Users title cannot be found!', timeout: 10000 });
        this.logger.info(`✅ Admin Menu has been loaded successfully!`);
    }

    async clickAddButton() {
        await this.validations.isVisible(this.addUserButton, { errorMessage: '❌ Add User button cannot be found!' });
        await this.actions.click(this.addUserButton, { errorMessage: '❌ Add User button cannot be clicked!' });
        this.logger.info(`🟦 Add User button clicked`);
    }

    
}