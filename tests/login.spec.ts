import { test, expect } from '@playwright/test';
import { LoginModule } from '../modules/LoginModule';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Login Functionality @regression', () => {

  test('loginTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Login.json', testInfo.title);

    for (const data of testData) {
      const loginModule = new LoginModule(data,page);
      await page.goto(getUrl());
      await loginModule.login();
    }
  });

  test('invalidLoginTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Login.json', testInfo.title);

    for (const data of testData) {
      const loginModule = new LoginModule(data,page);
      await page.goto(getUrl());
      await loginModule.login();
    }
  });

});