import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { locators } from './locators';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator(locators.usernameInput);
  readonly passwordInput = this.page.locator(locators.passwordInput);
  readonly loginButton = this.page.locator(locators.loginButton);
  readonly resultText = this.page.locator(locators.resultText);

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('login/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  getResultLocator() {
    return this.resultText;
  }
}
