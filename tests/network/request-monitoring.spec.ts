import { test, expect } from '@playwright/test';
import {
  APP_URL,
  CITIES_API,
  getRequestDetails
} from '../../utils/network-helpers';

test.describe('Network - Request Monitoring', () => {
  test('captures request URL, headers, method and payload', async ({ page }) => {
    let capturedRequest: ReturnType<typeof getRequestDetails> | undefined;

    await page.route(CITIES_API, async (route) => {
      capturedRequest = getRequestDetails(route.request());
      await route.continue();
    });

    await page.goto(APP_URL);

    expect(capturedRequest).toBeDefined();
    expect(capturedRequest?.url).toBe(CITIES_API);
    expect(capturedRequest?.method).toBe('GET');

    console.log('Request URL:', capturedRequest?.url);
    console.log('Request method:', capturedRequest?.method);
    console.log('Request headers:', capturedRequest?.headers);
    console.log('Request payload:', capturedRequest?.postData);
  });
});
