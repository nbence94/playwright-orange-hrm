import BasePage from './base';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');

        this.errorMessage = page.locator('div[class="orangehrm-login-error"]');
        this.title = page.locator('//h5[text()="Login"]');
    }

    // 📌 Actions
    async setUsername(username) {
        await this.actions.fill(this.username, username, { errorMessage: '❌ Username is not visible' });
        this.logger.info(`🟦 Username has been set. (value: ${username})`);
    }

    async setPassword(password) {
        await this.actions.fill(this.password, password, { errorMessage: '❌ Password is not visible' });
        this.logger.info(`🟦 Password has been set. (value: ${password})`);
    }

    async clickLoginButton() {
        await this.actions.click(this.loginButton, { errorMessage: '❌ Login button is not visible' });
        this.logger.info('🟦 Login button has been clicked');
    }

    // 📌 Validations
    async checkIsLoginPage() {
        await this.validations.isVisible(this.title, { errorMessage: '❌ Title is not visible' });
        this.logger.info('✅ Login page is visible');
    }

    async checkIsNotLoginPage() {
        await this.validations.isHidden(this.title, { errorMessage: '❌ Title is visible' });
        this.logger.info('✅ Login page is not visible');
    }

    async checkErrorMessage() {
        await this.validations.isVisible(this.errorMessage, { errorMessage: '❌ Error message is not visible' });
        this.logger.info('✅ Error message is visible');
    }

    async checkScreenElements() {
        await this.validations.isVisible(this.username, { timeout: 5000, errorMessage: '❌ Username field is not visible' });
        await this.validations.isVisible(this.password, { timeout: 5000, errorMessage: '❌ Password field is not visible' });
        await this.validations.isVisible(this.loginButton, { timeout: 5000, errorMessage: '❌ Login button is not visible' });
        this.logger.info('✅ Screen elements are visible');
    }

}