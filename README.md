# Playwright End-to-End Test Automation Framework

This is a robust, scalable, and fully modular automation framework built with **Playwright and TypeScript**, following best industry practices. It is designed with freelance and production usage in mind—featuring clean structure, reusable components, and tagged test execution.

---

## Key Features

- Playwright + TypeScript with Page Object Model (POM)
- Organized folder structure with clear naming conventions
- Covers multiple test types: @smoke, @functional, @regression
- Test case names include JIRA-style IDs and action-based naming
- Externalized locators, test data, and messages
- Fully parallel test execution across devices and browsers
- Supports screenshots and video on failure
- Easy script execution via pre-defined `npm` commands
- Cross-browser setup (Chromium by default, others configurable)

---

## Folder Structure Overview

```
playwright-portfolio/
├── src/
│   ├── pages/                     # Page Objects organized by feature
│   │   ├── basePage.ts            # Common methods for all pages
│   │   └── page1/
│   │       ├── page.ts            # page1Page extends BasePage
│   │       └── locators.ts        # page1 page locators
│   ├── tests/                     # Test cases grouped by feature; tagged with @smoke, @regression, @functional
│   │   ├── test-feature1.spec.ts
│   │   ├── test-feature2.spec.ts
│   │   └── test-feature3.spec.ts
│   ├── utils/                     # Reusable helpers
│   │   ├── constants.ts           # UI messages and texts
│   │   ├── testData.ts            # Centralized test data
│   │   └── fileUtils.ts           # File upload helpers
│   └── fixtures.ts                # Shared test fixtures
├── test-results/                  # Playwright auto-generated reports
├── .gitignore                     # Excludes node_modules, logs, and test artifacts
├── package.json
├── playwright.config.ts           # Test configuration file
├── README.md
```

---

## Test Case Naming Standard

- Follows: `@tag TC-ID should <action>`
- Example: test('@smoke TC-001 should login successfully with valid credentials', () => { ... });

---

## Configuration Details

- `baseURL`: Set for relative navigation
- `headless`: Runs tests in headless mode by default
- `video`, `screenshot`: Automatically saved on test failure
- Supports cross-browser: Uncomment projects from playwright.config.ts file to test on Firefox & WebKit

----

## Available NPM Scripts
You can run tests easily using the commands below:

Command	Description
- npm run test	Run all tests in headless mode
- npm run test:headed	Run all tests in headed mode
- npm run test:ui	Open Playwright Test UI
- npm run test:smoke	Run only @smoke-tagged tests
- npm run test:regression	Run only @regression tests
- npm run test:debug	Run in debug mode with trace viewer

Scripts are pre-configured in package.json for client convenience.

---

## Coding Best Practices Followed
- expect() used only inside test files, never inside page objects
- No logic duplication, clean reusable methods
- Modular design for scaling test coverage easily
- Consistent formatting and naming
- Comments provided where necessary for clarity
- .gitignore and environment safety pre-configured

---

## Sample Features Covered
- Login with valid/invalid credentials
- Dropdown selections (static, searchable, custom)
- File uploads (standard, drag-drop, custom file picker)

---

## Test Reports- HTML reports auto-generated under /playwright-report
- Screenshot & video available on test failure
- Trace viewer supported in debug mode

---

## Sample Test File Location
- src/tests/login.spec.ts
- src/tests/file-upload.spec.ts
- src/tests/dropdown.spec.ts

---

## What I Can Offer Clients

- Build Playwright automation frameworks from scratch with scalable architecture
- Convert existing manual test cases into automated suites
- Integrate CI/CD pipelines and cross-browser/device testing
- Maintain, refactor, and expand automation coverage over time
- Provide clear reporting, tagging, and documentation for stakeholders
- Deliver fast, reliable, and production-ready test solutions tailored to your app

---

## Custom Test Website
All test scenarios were built and validated using my own test application:

🔗 RapidTest – https://markadvk.github.io/rapidtest/

A minimal, self-hosted frontend app designed to simulate login flows, dropdowns, and file uploads for real-world E2E automation practice.

---

## Conclusion

This framework is battle-tested, highly maintainable, and ready to scale. Ideal for clients seeking reliable, professional-grade automation with clean code, modular structure, and end-to-end coverage.

Need help automating your web app?  
Let’s bring quality, speed, and stability to your software through high-standard testing.

📬 Reach out via Upwork or GitHub — your test coverage is one message away.