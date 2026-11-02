import { test, expect } from '@playwright/test';
import {
  APP_URL,
  CITIES_API
} from '../../utils/network-helpers';

test.describe('Network - Request Blocking', () => {
  test('aborts the cities API request and verifies the failure', async ({ page }) => {
    let failedRequestUrl: string | undefined;

    page.on('requestfailed', (request) => {
      if (request.url() === CITIES_API) {
        failedRequestUrl = request.url();
        console.log('Request failed:', request.url());
        console.log('Failure details:', request.failure()?.errorText);
      }
    });

    await page.route(CITIES_API, async (route) => {
      await route.abort();
    });

    await page.goto(APP_URL);

    await expect.poll(() => failedRequestUrl).toBe(CITIES_API);
  });
});
