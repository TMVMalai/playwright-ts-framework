import { test } from '@playwright/test';
import { ProductSearchModule } from '../modules/Modules';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Product Functionality @regression', () => {
  const storagePath = 'test-results/auth.json';
  let loginData: any;

  test.beforeAll(async ({ browser }) => {
    // read login credentials from test-data
    const loginArray = readJsonData('Login.json', 'loginTest');
    loginData = loginArray && loginArray.length ? loginArray[0] : null;
    if (!loginData) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(getUrl());

    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.clickSignupLogin();
    await login.enterLoginEmail(loginData.email);
    await login.enterLoginPassword(loginData.password);
    await login.clickLoginButton();
    await page.waitForTimeout(1000);

    // save authenticated storage state to reuse in tests
    await context.storageState({ path: storagePath });
    await context.close();
  });

  test('productSearchTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext({ storageState: storagePath });
      const page = await context.newPage();

      const productModule = new ProductSearchModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await page.goto(getUrl());
      await productModule.searchProduct();

      await context.close();
    }
  });

  test('productDetailsTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext({ storageState: storagePath });
      const page = await context.newPage();

      const productModule = new ProductSearchModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await page.goto(getUrl());
      await productModule.viewProductDetails();

      await context.close();
    }
  });

  test('verifyCategoryProductsTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext({ storageState: storagePath });
      const page = await context.newPage();

      const productModule = new ProductSearchModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await page.goto(getUrl());
      await productModule.filterByCategory();

      await context.close();
    }
  });

  test('verifyBrandProductsTest', async ({ browser }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const context = await browser.newContext({ storageState: storagePath });
      const page = await context.newPage();

      const productModule = new ProductSearchModule({ ...data, email: loginData?.email, password: loginData?.password }, page);
      await page.goto(getUrl());
      await productModule.filterByBrand();

      await context.close();
    }
  });

});
