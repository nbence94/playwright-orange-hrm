import BaseForm from '../../components/baseForm.js';

export default class AdminUserForm extends BaseForm {

  constructor(page) {
    super(page, {
      userRole: 'User Role',
      employeeName: 'Employee Name',
      status: 'Status',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password'
    });

    this.title = this.page.locator("//h6[normalize-space()='Add User']");
    this.saveButton = this.page.getByRole('button', { name: /^save$/i });
    this.cancelButton = this.page.getByRole('button', { name: /^cancel$/i });
  }

  async fillUserData(data) {
    await this.select('userRole', data.role);
    await this.autoComplete('employeeName', data.employee);
    await this.select('status', data.status);
    await this.fill('username', data.username);
    await this.fill('password', data.password);
    await this.fill('confirmPassword', data.password);
  }

  async checkTitle() {
    await this.validations.isVisible(this.title, { errorMessage: '❌ Add User title cannot be found!' });
    this.logger.info(`✅ Add User Menu has been loaded successfully!`);
  }

  async clickSaveButton() {
      await this.actions.click(this.saveButton, { errorMessage: '❌ Save button cannot be found!' });
      this.logger.info(`🟦 Save button clicked`);
      await this.page.waitForTimeout(5000);
  }

  async clickCancelButton() {
      await this.actions.click(this.cancelButton, { errorMessage: '❌ Cancel button cannot be found!' });
      this.logger.info(`🟦 Cancel button clicked`);
  }

}
