# Playwright TypeScript Framework

Converted from Java + Playwright + TestNG into TypeScript + Playwright Test.

## Java to TypeScript mapping

| Java + TestNG | TypeScript + Playwright Test |
|---|---|
| `pom.xml` | `package.json` |
| `@Test` | `test()` |
| `@BeforeMethod` | direct setup inside test / `test.beforeEach()` |
| `@AfterMethod` | Playwright auto cleanup + hooks |
| `CommonFunctions.launchUrl()` | `page.goto(getUrl())` |
| `Pages.java` | `pages/LoginPage.ts` |
| `Modules.java` | `modules/LoginModule.ts` |
| `DataProviderClasses.java` | JSON loop in `login.spec.ts` |
| ExtentReports | Playwright HTML report |
| RetryListener | `retries` in `playwright.config.ts` |

## Setup

```bash
npm install
npx playwright install
```

## Run UI tests

```bash
npm test
```

Run headed:

```bash
npm run test:headed
```

Run only regression tests:

```bash
npm run test:regression
```

View report:

```bash
npm run report
```

## Environment selection

Default environment is QA.

```bash
ENVIRONMENT=qa BASE_URL=https://your-qa-url.com npm test
ENVIRONMENT=dev DEV_URL=https://your-dev-url.com npm test
ENVIRONMENT=app APP_URL=https://your-prod-url.com npm test
```

## API test practice

API examples are kept in `api-tests/user.api.spec.ts`. To run them, either move the file into `tests/`, or change `testDir` in `playwright.config.ts` temporarily.

```bash
npx playwright test api-tests/user.api.spec.ts
```

## Interview explanation

> My original framework was Java + Playwright + TestNG. I converted the same structure into TypeScript + Playwright Test by replacing TestNG annotations with Playwright `test()`, moving page classes into TypeScript Page Objects, using JSON files for data-driven testing, and using Playwright's built-in retries, screenshots, traces, videos, and HTML reports.
