import { test } from '@playwright/test';
import { CheckoutModule, SubscriptionModule, EndToEndModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Checkout Functionality @regression', () => {

  test('checkoutWithoutLoginTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const checkoutModule = new CheckoutModule(data, page);
      await page.goto(getUrl());
      await checkoutModule.checkoutWithoutLogin();
    }
  });

  test('checkoutWithLoginTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const checkoutModule = new CheckoutModule(data, page);
      await page.goto(getUrl());
      await checkoutModule.checkoutWithLogin();
    }
  });

  test('placeOrderTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const checkoutModule = new CheckoutModule(data, page);
      await page.goto(getUrl());
      await checkoutModule.placeOrder();
    }
  });

});

test.describe('Subscription Functionality @regression', () => {

  test('subscriptionHomePageTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const subscriptionModule = new SubscriptionModule(data, page);
      await page.goto(getUrl());
      await subscriptionModule.subscribeFromHomePage();
    }
  });

  test('subscriptionCartPageTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const subscriptionModule = new SubscriptionModule(data, page);
      await page.goto(getUrl());
      await subscriptionModule.subscribeFromCartPage();
    }
  });

});

test.describe('End-to-End User Journey @regression', () => {

  test('endToEndUserJourneyTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const endToEndModule = new EndToEndModule(data, page);
      await page.goto(getUrl());
      await endToEndModule.completeUserJourney();
    }
  });

});
