import { test } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test.describe('Navigation Tests', () => {

  // Global variables
  let loginPage;
  let app;

  test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);
    await loginPage.clearSoftErrors();
    await loginPage.testInfo(testInfo);
    await loginPage.openOrangeHRM();
  });

  test.afterEach(async () => {
    await loginPage.getSoftErrors();
  });

  test('navigate-in-app @regression', async () => {

    await test.step('Attempt to login', async () => {
      const user = await loginPage.getAdminUser();
      await loginPage.setUsername(user.username);
      await loginPage.setPassword(user.password);
      app = await loginPage.clickLoginButton();
    });
    
    await test.step('Navigate in app', async () => {
      await app.navigate.clickAdmin();
    });

    await test.step('Check Admin Menu', async () => {
      await app.admin.checkTitle();
    });

    await test.step("Select PIM menu", async () => {
      await app.navigate.clickPim();
    });

    await test.step("Select My Info menu", async () => {
      await app.navigate.clickMyInfo();
    });
    
  });


});

/*
npx playwright test navigation.spec.js --grep 'navigate-in-app' --headed
*/