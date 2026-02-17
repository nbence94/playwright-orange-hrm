import { test } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test.describe('Login Tests', () => {

  // Global variables
  let loginPage;

  test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);
    await loginPage.clearSoftErrors();
    await loginPage.testInfo(testInfo);
    await loginPage.openOrangeHRM();
  });

  test.afterEach(async () => {
    await loginPage.getSoftErrors();
  });

  test('simple-login @regression', async () => {

    await test.step('Check login page', async () => {
      await loginPage.checkIsLoginPage();
      await loginPage.checkScreenElements();
    });

    await test.step('Attempt to login', async () => {
      const user = await loginPage.getAdminUser();
      await loginPage.setUsername(user.username);
      await loginPage.setPassword(user.password);
      await loginPage.clickLoginButton();
    });

    await test.step('Check if Login is successful', async () => {
      await loginPage.checkIsNotLoginPage();
    });
    
  });

  test('invalid-login @regression', async () => {

    await test.step('Attempt to login (invalid password)', async () => {
      const user = await loginPage.getAdminUser();
      await loginPage.setUsername(user.username);
      await loginPage.setPassword('invalid');
      await loginPage.clickLoginButton();
    });

    await test.step('Check if Error Message', async () => {
      await loginPage.checkIsLoginPage();
      await loginPage.checkErrorMessage();
    });

    await test.step('Attempt to login (invalid username)', async () => {
      const user = await loginPage.getAdminUser();
      await loginPage.setUsername('invalid');
      await loginPage.setPassword(user.password);
      await loginPage.clickLoginButton();
    });

    await test.step('Check if Error Message', async () => {
      await loginPage.checkIsLoginPage();
      await loginPage.checkErrorMessage();
    });
    
  });


});