import BasePage from '../pages/base';

export default class TableItem extends BasePage {

  constructor(page, columnMap) {
    super(page);
    this.columnMap = columnMap; // { columnKey: 'columnName' }

    // elements
    this.table = page.locator('div.oxd-table');
    this.rows = this.table.locator('.oxd-table-body .oxd-table-row');
    this.headers = this.table.locator('.oxd-table-header-cell');
    this.cell = (row, index) => row.locator('//div[@role="cell"]/div[not(@class)]').nth(index);
  }

  async _getCellsData(row) {
    const cells = {};
    for (const [key, value] of Object.entries(this.columnMap)) {
      const cell = await this._getCell(row, key);
      cells[value] = await this.actions.readText(cell, { errorMessage: `❌ Failed to read ${value} (tableItem.js)` });
    }
    return cells;
  }

  async _getColumnIndex(columnKey) {
    const columnName = this.columnMap[columnKey];
    let headers = await this.actions.readAllText(this.headers, { errorMessage: '❌ Failed to read all headers (tableItem.js)' });
    headers = headers.toString().replaceAll('AscendingDescending', '').split(',');

    const index = headers.findIndex(h =>
      h.trim().toLowerCase() === columnName.toLowerCase()
    );


    if (index === -1)
      throw new Error(`❌ Column not found: ${columnName} (tableItem.js)`);

    return index - 1;
  }

  async _getCell(row, columnKey) {
    const index = await this._getColumnIndex(columnKey);
    return this.cell(row, index);
  }

  async _findRowBy(columnKey, value) {
    await this.page.waitForTimeout(2000);
    await this.table.waitFor({ timeout: 5000 });
    const count = await this.rows.count();
  
    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      const cell = await this._getCell(row, columnKey);
      const text = (await this.actions.readText(cell, { errorMessage: '❌ Cell text cannot be read (tableItem.js)' })).trim();
      if (text === value) {
        return row;
      }
    }

    throw new Error(`❌ Row not found: ${columnKey}=${value} (tableItem.js)`);
  }
  
}