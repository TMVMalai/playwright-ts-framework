import { test } from '@playwright/test';
import { CheckoutModule, SubscriptionModule, EndToEndModule } from '../modules/Modules';
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

test.describe('Checkout Functionality @regression', () => {

  test('checkoutWithoutLoginTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const checkoutModule = new CheckoutModule({ ...data }, page);
      await checkoutModule.checkoutWithoutLogin();

      await context.close();
    }
  });

  test('checkoutWithLoginTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const checkoutModule = new CheckoutModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await checkoutModule.checkoutWithLogin();

      await context.close();
    }
  });

  test('placeOrderTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const checkoutModule = new CheckoutModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await checkoutModule.placeOrder();

      await context.close();
    }
  });

});

test.describe('Subscription Functionality @regression', () => {

  test('subscriptionHomePageTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const subscriptionModule = new SubscriptionModule({ ...data }, page);
      await subscriptionModule.subscribeFromHomePage();

      await context.close();
    }
  });

  test('subscriptionCartPageTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const subscriptionModule = new SubscriptionModule({ ...data }, page);
      await subscriptionModule.subscribeFromCartPage();

      await context.close();
    }
  });

});

test.describe('End-to-End User Journey @regression', () => {

  test('endToEndUserJourneyTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const endToEndModule = new EndToEndModule({ ...data }, page);
      await endToEndModule.completeUserJourney();

      await context.close();
    }
  });

  test('endToEndUserJourney', async ({ browser }, testInfo) => {
    const testData = readJsonData('Checkout.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const endToEndModule = new EndToEndModule({ ...data }, page);
      await endToEndModule.completeUserJourney();

      await context.close();
    }
  });


});
