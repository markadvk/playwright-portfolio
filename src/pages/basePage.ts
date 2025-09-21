/**
 * VerifyKoders Automation Framework
 * Author: VerifyKoders (Geetanjali)
 * Licensed under MIT License
 */

// Base class with common actions used by all page objects
import { Page, Locator } from '@playwright/test';

type LocatorOrSelector = string | Locator;

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(endPoint: string) {
    await this.page.goto(endPoint);
  }

  async click(locator: LocatorOrSelector) {
    await this.toLocator(locator).click();
  }

  async fill(locator: LocatorOrSelector, text: string) {
    await this.toLocator(locator).fill(text);
  }

  async getText(locator: LocatorOrSelector): Promise<string | null> {
    return await this.toLocator(locator).textContent();
  }

  async reload() {
    await this.page.reload();
  }

  protected toLocator(locator: LocatorOrSelector): Locator {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }
}
