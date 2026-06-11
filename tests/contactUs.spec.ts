import { test } from '@playwright/test';
import { ContactUsModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

const storagePath = 'test-results/auth.json';
let loginData: any;

test.beforeAll(async ({ browser }) => {
  const loginArray = readJsonData('Login.json', 'loginTest');
  loginData = loginArray && loginArray.length ? loginArray[0] : null;
  if (!loginData) return;

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(getUrl());

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

test.describe.configure({ mode: 'parallel' });

test.describe('Contact Us Functionality @regression', () => {

  test('contactUsTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('ContactUs.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const contactUsModule = new ContactUsModule(data, page);
      await contactUsModule.submitContactForm();

      await context.close();
    }
  });

});
