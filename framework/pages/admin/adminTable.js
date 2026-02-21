import TableItem from '../../components/tableItem';

export default class AdminTable extends TableItem{

  constructor(page) {
    super(page, {
      username: 'Username',
      userRole: 'User Role',
      employeeName: 'Employee Name',
      status: 'Status'
    });

    // elements
    this.checkBox = (container) => container.locator('//label[span]');
    this.editButton = (container) => container.locator('button:has(i[class*="pencil"])');
    this.deleteButton = (container) => container.locator('button:has(i[class*="trash"])');

  }

  async selectByUsername(username) {
    const row = await this._findRowBy('username', username);
    await this.actions.click(this.checkBox(row), { errorMessage: '❌ Failed to click checkbox (adminTable.js)' });
    this.logger.info(`🟦 User has been selected.`);
  }

  async openEditByUsername(username) {
    const row = await this._findRowBy('username', username);
    await this.actions.click(this.editButton(row), { errorMessage: '❌ Failed to click edit button (adminTable.js)' });
    this.logger.info(`🟦 User has been opened to edit.`)
  }

  async deleteByUsername(username, options = { cofirm: false }) {
    const row = await this._findRowBy('username', username);
    await this.actions.click(this.deleteButton(row), { errorMessage: '❌ Failed to click delete button (adminTable.js)' });

    // OrangeHRM confirmation modal
    if (options.cofirm) await this.page.getByRole('button', { name: /yes/i }).click();
    else await this.page.getByRole('button', { name: /no/i }).click();
    
    this.logger.info(`🟦 User has been selected to delete. (confirmed:${options.cofirm})`);
  }

  async readDataByUsername(username) {
    const row = await this._findRowBy('username', username);
    const data = await this._getCellsData(row);

    this.logger.info(`🟦 User data: ${JSON.stringify(data)}`);
    return data;
  }

  async readAllData() {
    await this.page.waitForTimeout(1000);
    const rows = this.rows;
    const data = [];
    for (const row of await rows.all()) {
      data.push(await this._getCellsData(row));
    }
    //this.logger.info(`🟦 All user data: ${JSON.stringify(data, null, 2)}`);
    return data;
  }

  async checkIfUserExists(username, { shouldExist = true }) {
    const row = await this._findRowBy('username', username);
    const result = row !== null;
    if(result && shouldExist) this.logger.info(`✅ User exists. (user: ${username})`);
    else if(!result && shouldExist) this.logger.info(`❌ User does not exist. (user: ${username})`);   
    else if(result && !shouldExist) this.logger.info(`❌ User exists but should not. (user: ${username})`);
    else this.logger.info(`✅ User does not exist and should not. (user: ${username})`);

    return result;
  }

}