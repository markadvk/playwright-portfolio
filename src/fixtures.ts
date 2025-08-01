// Custom fixtures for injecting page objects into tests
import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from './pages/login/page';
import { DropdownPage } from './pages/dropdown/page';
import { FileUploadPage } from './pages/file-upload/page';

type MyFixtures = {
  loginPage: LoginPage;
  dropdownPage: DropdownPage;
  fileUploadPage: FileUploadPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open();
    await use(dropdownPage);
  },

  fileUploadPage: async ({ page }, use) => {
    const fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.open();
    await use(fileUploadPage);
  },
});

export { expect } from '@playwright/test';
