import { test } from '@playwright/test';
import { AddToCartModule } from '../modules/Modules';
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

test.describe('Cart Functionality @regression', () => {

  test('addToCartTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const cartModule = new AddToCartModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await cartModule.addProductToCart();

      await context.close();
    }
  });

  test('cartQuantityTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const cartModule = new AddToCartModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await cartModule.addProductWithQuantity();

      await context.close();
    }
  });

  test('removeProductFromCartTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const context = loginData ? await browser.newContext({ storageState: storagePath }) : await browser.newContext();
      const page = await context.newPage();
      await page.goto(getUrl());

      const cartModule = new AddToCartModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await cartModule.removeProductFromCart();

      await context.close();
    }
  });

});
