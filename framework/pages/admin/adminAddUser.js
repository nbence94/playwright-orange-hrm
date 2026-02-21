import BaseForm from '../../components/baseForm.js';
import AutoComplete from '../../components/autoComplete.js';

export default class AdminAddUserForm extends BaseForm {

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
  }

  async setEmployee(name) {
    const group = this.item('employeeName');
    const ac = new AutoComplete(this.page, group);

    await ac.search(name);
  }

  async fillUserData(data) {
    await this.select('userRole', data.role);
    await this.setEmployee(data.employee);
    await this.select('status', data.status);
    await this.fill('username', data.username);
    await this.fill('password', data.password);
    await this.fill('confirmPassword', data.password);
  }

  async checkTitle() {
    await this.validations.isVisible(this.title, { errorMessage: '❌ Add User title cannot be found!' });
    this.logger.info(`✅ Add User Menu has been loaded successfully!`);
  }

}
