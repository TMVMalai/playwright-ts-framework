import { expect, test } from '@playwright/test';

test.describe('Basic API Testing Practice', () => {
  test('GET user and validate response', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
  });

  test('POST create user and validate response', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'Thiru',
        job: 'QA Engineer'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Thiru');
    expect(body.job).toBe('QA Engineer');
    expect(body).toHaveProperty('id');
  });
});
