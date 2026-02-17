import logger from './logger';
import ErrorHandler from './errorHandler';

export default class Actions {
  constructor(page) {
    this.page = page;
  }

  async click(locator, options = {}) {
    const { errorMessage = 'Click failed', soft = false, silent = false, timeout } = options;

    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click({ timeout });
    } catch (err) {

      if(silent) return;
      logger.error(errorMessage);
      if (soft) {
        ErrorHandler.addError(errorMessage, err);
        return;
      }

      throw err;
    }
  }

  async fill(locator, text, options = {}) {
    const { errorMessage = 'Fill failed', soft = false, silent = false, timeout } = options;

    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.fill(text, { timeout });
    } catch (err) {

      if(silent) return;
      logger.error(errorMessage);
      if (soft) {
        ErrorHandler.addError(errorMessage, err);
        return;
      }

      throw err;
    }
  }

}