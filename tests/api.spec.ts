import { test, expect } from '@playwright/test';
import { readJsonData } from '../utils/jsonReader';

test.describe('Automation Exercise API Tests', () => {
  test('apiGetAllProductsTest', async ({ request }, testInfo) => {
    const testData = readJsonData('Api.json', 'apiGetAllProductsTest');
    const response = await request.get(testData[0].endpoint);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toMatch(/application\/json|text\/html/);

    const body = await response.json().catch(() => null);
    expect(body).not.toBeNull();
  });

  test('apiSearchProductTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiSearchProductTest');
    const response = await request.post(testData[0].endpoint, { data: { search_product: testData[0].searchProduct } });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeDefined();
  });

  test('apiSearchProductWithoutParameterTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiSearchProductWithoutParameterTest');
    const response = await request.post(testData[0].endpoint, { data: {} });
    expect(response.status()).not.toBe(500);
  });

  test('apiVerifyLoginValidTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiVerifyLoginValidTest');
    const response = await request.post(testData[0].endpoint, { data: { email: testData[0].email, password: testData[0].password } });
    expect(response.status()).toBe(200);
  });

  test('apiVerifyLoginInvalidTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiVerifyLoginInvalidTest');
    const response = await request.post(testData[0].endpoint, { data: { email: testData[0].email, password: testData[0].password } });
    expect(response.status()).not.toBe(200);
  });

  test('apiCreateUserTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiCreateUserTest');
    const response = await request.post(testData[0].endpoint, { data: testData[0].payload });
    expect([200,201]).toContain(response.status());
  });

  test('apiDeleteUserTest', async ({ request }) => {
    const testData = readJsonData('Api.json', 'apiDeleteUserTest');
    const response = await request.delete(testData[0].endpoint, { data: testData[0].payload });
    expect([200, 204]).toContain(response.status());
  });
});
