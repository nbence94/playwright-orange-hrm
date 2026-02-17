import ErrorHandler from '../utils/errorHandler';
import Actions from '../utils/actions';
import Validations from '../utils/validations';
import logger from '../utils/logger';
import loginUser from '../data/config/login.json' assert {type: 'json'};

export default class BasePage {

    constructor(page) {
        this.page = page;
        this.actions = new Actions(page);
        this.validations = new Validations(page);
        this.logger = logger;
    }

    async openOrangeHRM() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }

    async testInfo(testInfo) {
        this.logger.info('----------------------------------------');
        this.logger.info(`Test started: ${testInfo.title}`);
        this.logger.info(`Test retry: ${testInfo.retry + 1}`);
        this.logger.info(`Test project: ${testInfo.project.name}`);
        this.logger.info('----------------------------------------');
    }

    async getAdminUser() {
        return loginUser.admin;
    }

    async clearSoftErrors() {
        ErrorHandler.clear();
    }

    async getSoftErrors() {
        ErrorHandler.throwIfAny();
    }
    
}



