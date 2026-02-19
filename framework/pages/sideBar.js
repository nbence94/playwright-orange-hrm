import BasePage from "./base";

export default class SideBar extends BasePage {
    constructor(page) {
        super(page);

        // elements
        this.admin = this.page.locator("//aside//span[normalize-space()='Admin']");
        this.pim = this.page.locator("//aside//span[normalize-space()='PIM']");
        this.leave = this.page.locator("//aside//span[normalize-space()='Leave']");
        this.myInfo = this.page.locator("//aside//span[normalize-space()='My Info']");

        this.sideBarButton = this.page.locator("//aside//button");

    }

    async clickAdmin() {
        await this.actions.click(this.admin, { errorMessage: "Failed to click Admin button" });
        this.logger.info("🟦 'Admin' menu has been selected");
        await this.page.waitForTimeout(1000);
    }

    async clickPim() {
        await this.actions.click(this.pim, { errorMessage: "Failed to click PIM button" });
        this.logger.info("🟦 'PIM' menu has been selected");
        await this.page.waitForTimeout(1000);
    }

    async clickLeave() {
        await this.actions.click(this.leave, { errorMessage: "Failed to click Leave button" });
        this.logger.info("🟦 'Leave' menu has been selected");
        await this.page.waitForTimeout(1000);
    }

    async clickMyInfo() {
        await this.actions.click(this.myInfo, { errorMessage: "Failed to click My Info button" });
        this.logger.info("🟦 'My Info' menu has been selected");
        await this.page.waitForTimeout(1000);
    }

    async clickSideBarButton() {
        await this.actions.click(this.sideBarButton, { errorMessage: "Failed to click side bar button" });
        this.logger.info("🟦 Side bar button has been clicked");
        await this.page.waitForTimeout(1000);
    }

}
