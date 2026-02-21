import SearchPanel from "../../components/searchPanel.js";

export default class AdminSearchPanel extends SearchPanel {
    constructor(page) {
        super(page, {
            username: 'Username',
            userRole: 'User Role',
            employeeName: 'Employee Name',
            status: 'Status'
        });
    }

    async filterByUsername(username) {
        await this._setSearchValue('username', username);
    }
    
    async filterByEmployeeName(employeeName) {
        await this._setSearchValue('employeeName', employeeName);
    }
    
    async filterByStatus(status) {
        await this._selectDropdownValue('status', status);
    }


}