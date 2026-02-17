import fs from 'fs';
import path from 'path';

export default class ErrorHandler {

  static errors = [];
  static filePath = path.resolve('soft_assert_errors.txt');

  static addError(message, originalError) {

    const timestamp = new Date().toISOString();

    const formatted = `[${timestamp}] ${message}
        Playwright error: ${originalError?.message ?? 'Unknown error'}
        ------------------------------------------------------------
        `;

    this.errors.push(formatted);
    fs.appendFileSync(this.filePath, formatted);
  }

  static hasErrors() {
    return this.errors.length > 0;
  }

  static getErrors() {
    return this.errors.join('\n');
  }

  static clear() {
    this.errors = [];
    if (fs.existsSync(this.filePath)) {
      fs.unlinkSync(this.filePath);
    }
  }

  static throwIfAny() {
    if (this.hasErrors()) {
      throw new Error(
        `\n\nSOFT ASSERT FAILURES DETECTED:\n\n${this.getErrors()}`
      );
    }
  }
}
