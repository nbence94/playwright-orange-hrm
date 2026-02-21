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

  test('admin-functions @regression', async () => {

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

    await test.step("Read all user data", async () => {
      await app.admin.table.readAllData();
    });

    let user = {
      role: 'ESS',
      employee: 'Timothy',
      status: 'Enabled',
      username: 'autoTest01',
      password: 'Password01',
      confirmPassword: 'Password01'
    }
    await test.step("Create User", async() => {
      await app.admin.clickAddButton();
      await app.admin.addUser.checkTitle();
      await app.admin.addUser.fillUserData(user);
      await app.admin.addUser.clickSaveButton();
      await app.admin.table.isLoaded();
      await app.admin.checkTitle();
    });

    await test.step("Filter by username", async () => {
      await app.admin.searchPanel.filterByUsername(user.username);
      await app.admin.searchPanel.filterByStatus(user.status);
      await app.admin.searchPanel.clickSearchButton();
    });

    await test.step("Select user", async () => {
      await app.admin.table.selectByUsername(user.username);
    });

    await test.step("Read user data", async () => {
      const userData = await app.admin.table.readDataByUsername(user.username);
    });

    await test.step.skip("Open edit user", async () => {
      await app.admin.table.openEditByUsername(user.username);
    });

    await test.step("Delete user", async () => {
      await app.admin.table.deleteByUsername(user.username, { cofirm: false });
    });

    await test.step("Check if user does exist", async () => {
      await app.admin.table.checkIfUserExists(user.username, { shouldExist: true });
    });
    
  }); 

});

/*
npx playwright test navigation.spec.js --grep 'navigate-in-app' --headed
npx playwright test navigation.spec.js --grep 'admin-functions' --headed
*/