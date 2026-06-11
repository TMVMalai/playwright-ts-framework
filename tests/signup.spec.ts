import { test } from '@playwright/test';
import { SignupModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

const storagePath = 'test-results/auth.json';
let loginData: any;

test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ browser }) => {
  const loginArray = readJsonData('Login.json', 'loginTest');
  loginData = loginArray && loginArray.length ? loginArray[0] : null;
  if (!loginData) return;

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(getUrl());

  // perform login once and save storage
  const home = new (await import('../pages/HomePage')).HomePage(page);
  const login = new (await import('../pages/LoginPage')).LoginPage(page);
  await home.clickSignupLogin();
  await login.enterLoginEmail(loginData.email);
  await login.enterLoginPassword(loginData.password);
  await login.clickLoginButton();
  await page.waitForTimeout(1000);
  await context.storageState({ path: storagePath });
  await context.close();
});

test.describe('Signup Functionality @regression', () => {

  test('signupTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Signup.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const signupModule = new SignupModule(data, page);
      await signupModule.signupNewUser();

      await context.close();
    }
  });

});
