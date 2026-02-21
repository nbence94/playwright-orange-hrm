import logger from './logger';
import ErrorHandler from './errorHandler';

export default class Validations {
  constructor(page) {
    this.page = page;
  }

  async isVisible(locator, options = {}) {
    return this.#executeValidation(async () => {
      await locator.waitFor({ state: 'visible', timeout: options.timeout ?? 5000 });
      return true;
    }, 'Element is not visible', options);
  }

  async isHidden(locator, options = {}) {
    return this.#executeValidation(async () => {
      await locator.waitFor({ state: 'hidden', timeout: options.timeout ?? 5000 });
      return true;
    }, 'Element is not hidden', options);
  }

  async hasText(locator, expectedText, options = {}) {
    return this.#executeValidation(async () => {
      const text = await locator.textContent();
      return text?.trim() === expectedText;
    }, `Text mismatch. Expected: "${expectedText}"`, options);
  }

  async containsText(locator, expectedText, options = {}) {
    return this.#executeValidation(async () => {
      const text = await locator.textContent();
      return text?.includes(expectedText);
    }, `Text does not contain: "${expectedText}"`, options);
  }

  async isEnabled(locator, options = {}) {
    return this.#executeValidation(async () => {
      return await locator.isEnabled();
    }, 'Element is disabled', options);
  }

  async isChecked(locator, options = {}) {
    return this.#executeValidation(async () => {
      return await locator.isChecked();
    }, 'Checkbox is not checked', options);
  }

  async equal(actual, expected, options = {}) {
    return this.#executeValidation(() => {
      return actual === expected;
    }, `Values do not match. Expected: "${expected}", Actual: "${actual}"`, options);
  }

  async includes(actual, expected, options = {}) {
    return this.#executeValidation(() => {
      return actual.includes(expected);
    }, `Value does not include: "${expected}", Actual: "${actual}"`, options);
  }

  // =========================
  // CORE VALIDATION ENGINE
  // =========================

  async #executeValidation(action, defaultMessage, options) {

    const {
      silent = false,
      soft = false,
      errorMessage,
    } = options;

    const message = errorMessage ?? defaultMessage;

    try {

      const result = await action();

      if (result === true) {
        return true;
      }

      // logikai hiba (nem exception)
      return this.#handleFailure(message, null, { silent, soft });

    } catch (err) {
      return this.#handleFailure(message, err, { silent, soft });
    }
  }

  #handleFailure(message, err, { silent, soft }) {

    // 1) SILENT MODE
    if (silent) {
      logger.warn(`Silent validation failed: ${message}`);
      return false;
    }

    // 2) SOFT MODE
    if (soft) {
      logger.error(`⚠️ Soft error detected: ${message}`);
      ErrorHandler.addError(message, err);
      return false;
    }

    // 3) HARD FAIL
    logger.error(`❌ Fatal error detected: ${message}`);
    throw new Error(message + (err?.message ? `\n${err.message}` : ''));
  }
}
