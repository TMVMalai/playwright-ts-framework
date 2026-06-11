import { test } from '@playwright/test';
import { ContactUsModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Contact Us Functionality @regression', () => {

  test('contactUsTest', async ({ page }, testInfo) => {
    const testData = readJsonData('ContactUs.json', testInfo.title);

    for (const data of testData) {
      const contactUsModule = new ContactUsModule(data, page);
      await page.goto(getUrl());
      await contactUsModule.submitContactForm();
    }
  });

});
