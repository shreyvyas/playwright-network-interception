import type { Page, Request, Route } from '@playwright/test';

export const CITIES_API =
  'https://qtrip-backend.labs.crio.do/api/v1/cities';

export const APP_URL =
  process.env.BASE_URL ?? 'https://qtripdynamic-qa-frontend.vercel.app';

export interface RequestDetails {
  url: string;
  method: string;
  headers: Record<string, string>;
  postData: string | null;
}

export function getRequestDetails(request: Request): RequestDetails {
  return {
    url: request.url(),
    method: request.method(),
    headers: request.headers(),
    postData: request.postData()
  };
}

export async function continueRequest(route: Route): Promise<void> {
  await route.continue();
}

export async function abortRequest(route: Route): Promise<void> {
  await route.abort();
}

export async function mockJsonResponse(
  route: Route,
  status: number,
  body: unknown
): Promise<void> {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body)
  });
}

export async function openApplication(page: Page): Promise<void> {
  await page.goto(APP_URL);
}
