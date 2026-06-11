import { test } from '@playwright/test';
import { AddToCartModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Cart Functionality @regression', () => {

  test('addToCartTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const cartModule = new AddToCartModule(data, page);
      await page.goto(getUrl());
      await cartModule.addProductToCart();
    }
  });

  test('cartQuantityTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const cartModule = new AddToCartModule(data, page);
      await page.goto(getUrl());
      await cartModule.addProductWithQuantity();
    }
  });

  test('removeProductFromCartTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Cart.json', testInfo.title);

    for (const data of testData) {
      const cartModule = new AddToCartModule(data, page);
      await page.goto(getUrl());
      await cartModule.removeProductFromCart();
    }
  });

});
