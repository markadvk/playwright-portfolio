import { test, expect } from '../fixtures';
import { testData } from '../utils/testData';
import { TEXTS } from '../utils/constants';

test.describe('Login Tests', () => {
  const loginMessages = TEXTS.login;
  test('@smoke TC-001 should login successfully with valid credentials', async ({ loginPage }) => {
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await expect(loginPage.getResultLocator()).toHaveText(loginMessages.success);
  });

  test('@functional TC-002 should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );
    await expect(loginPage.getResultLocator()).toHaveText(loginMessages.failure);
  });

  test('@functional TC-003 should show validation message for empty credentials', async ({ loginPage }) => {
    await loginPage.login(
      testData.emptyUser.username,
      testData.emptyUser.password
    );
    await expect(loginPage.getResultLocator()).toHaveText(loginMessages.empty);
  });

  test('@regression TC-004 should allow successful login after a failed attempt', async ({ loginPage }) => {
    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );
    await expect(loginPage.getResultLocator()).toHaveText(loginMessages.failure);

    // Since the sample web page does not allow re-login on the same page,
    // we reload the page to reset state for demo/testing purpose.
    await loginPage.reload();

    // Try again with valid credentials
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await expect(loginPage.getResultLocator()).toHaveText(loginMessages.success);
  });
});
