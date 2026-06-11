import { test } from '@playwright/test';
import { SignupModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Signup Functionality @regression', () => {

  test('signupTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Signup.json', testInfo.title);

    for (const data of testData) {
      const signupModule = new SignupModule(data, page);
      await page.goto(getUrl());
      await signupModule.signupNewUser();
    }
  });

});
