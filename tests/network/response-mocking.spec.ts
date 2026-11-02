import { test, expect } from '@playwright/test';
import mockResponses from '../../test-data/mock-responses.json';
import {
  APP_URL,
  CITIES_API,
  mockJsonResponse
} from '../../utils/network-helpers';

test.describe('Network - Response Mocking', () => {
  test('mocks a 500 response and validates the response body', async ({ page }) => {
    const responsePromise = page.waitForResponse(
      response => response.url() === CITIES_API
    );

    // Register the route before navigating so the API request is intercepted.
    await page.route(CITIES_API, async (route) => {
      await mockJsonResponse(
        route,
        mockResponses.citiesServerError.status,
        mockResponses.citiesServerError.body
      );
    });

    await page.goto(APP_URL);

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(500);
    expect(responseBody).toEqual(mockResponses.citiesServerError.body);

    console.log('Mocked response status:', response.status());
    console.log('Mocked response URL:', response.url());
    console.log('Mocked response body:', responseBody);
  });
});
