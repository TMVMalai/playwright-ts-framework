import { test } from '@playwright/test';
import { ProductSearchModule } from '../modules/Modules';
import { getUrl } from '../utils/configReader';
import { readJsonData } from '../utils/jsonReader';

test.describe.configure({ mode: 'parallel' });

test.describe('Product Functionality @regression', () => {

  test('productSearchTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const productModule = new ProductSearchModule(data, page);
      await page.goto(getUrl());
      await productModule.searchProduct();
    }
  });

  test('productDetailsTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const productModule = new ProductSearchModule(data, page);
      await page.goto(getUrl());
      await productModule.viewProductDetails();
    }
  });

  test('verifyCategoryProductsTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const productModule = new ProductSearchModule(data, page);
      await page.goto(getUrl());
      await productModule.filterByCategory();
    }
  });

  test('verifyBrandProductsTest', async ({ page }, testInfo) => {
    const testData = readJsonData('Product.json', testInfo.title);

    for (const data of testData) {
      const productModule = new ProductSearchModule(data, page);
      await page.goto(getUrl());
      await productModule.filterByBrand();
    }
  });

});
