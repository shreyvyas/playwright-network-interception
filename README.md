# Playwright Network Interception Framework

A focused TypeScript + Playwright portfolio project demonstrating how to inspect, block, and mock browser network requests.

## What this project covers

| Test | Playwright capability | Expected result |
|---|---|---|
| Request monitoring | `page.route()` and `route.request()` | Captures URL, headers, method and payload |
| Request blocking | `route.abort()` and `requestfailed` | Verifies that the API request failed |
| Response mocking | `route.fulfill()` and `waitForResponse()` | Returns and validates a mocked HTTP 500 response |

## Tech stack

- TypeScript
- Playwright Test
- Node.js
- npm

## Project structure

```text
playwright-network-interception/
├── tests/
│   └── network/
│       ├── request-monitoring.spec.ts
│       ├── request-blocking.spec.ts
│       └── response-mocking.spec.ts
├── test-data/
│   └── mock-responses.json
├── utils/
│   └── network-helpers.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── .gitignore
```

## Prerequisites

Install Node.js (LTS recommended). Verify the installation:

```bash
node --version
npm --version
```

## Setup

Clone the repository, then run:

```bash
npm install
npx playwright install chromium
```

## Execute tests

Run all tests:

```bash
npm test
```

Run only network interception tests:

```bash
npm run test:network
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Open the HTML report after a test run:

```bash
npm run test:report
```

## How the tests work

### 1. Request monitoring

The test intercepts the cities API request, reads request details from `route.request()`, and continues the original request using `route.continue()`.

### 2. Request blocking

The test aborts the cities API request using `route.abort()`. It listens for the `requestfailed` event and verifies that the targeted request failed.

### 3. Response mocking

The test intercepts the cities API request and returns a controlled HTTP 500 JSON response using `route.fulfill()`. It then waits for the response and validates its status and body.

## Configuration

The default application URL is:

`https://qtripdynamic-qa-frontend.vercel.app`

To override it, set `BASE_URL` in your shell before running the tests.

PowerShell:

```powershell
$env:BASE_URL="https://your-test-environment.example"
npm test
```

## Important notes

- These tests depend on the QTrip demo frontend and its cities API being reachable.
- The API URL is deliberately centralized in `utils/network-helpers.ts`.
- The mock response is stored separately in `test-data/mock-responses.json`.
- The tests demonstrate network behavior; they do not depend on fragile UI selectors.
- The `requestfailed` event indicates a transport-level request failure. An HTTP 500 response is still a completed HTTP response, not a request failure.
- Do not commit secrets, access tokens, or private environment files.

## Potential extensions

- Add request and response logging as reusable utilities.
- Add tests for delayed responses with `route.fulfill({ delay: ... })`.
- Add tests for modifying request headers with `route.continue({ headers: ... })`.
- Add browser projects for Firefox and WebKit.
- Add a GitHub Actions workflow for CI execution.

## Author

Add your name, GitHub profile, and contact details here.
