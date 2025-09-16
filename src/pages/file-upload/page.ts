import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { locators } from './locators';

export class FileUploadPage extends BasePage {
  readonly standardInput = this.page.locator(locators.standardInput);
  readonly standardResult = this.page.locator(locators.standardResult);

  readonly dragDropInput = this.page.locator(locators.dragDropInput);
  readonly dragDropResult = this.page.locator(locators.dragDropResult);

  readonly customInput = this.page.locator(locators.customInput);
  readonly customResult = this.page.locator(locators.customResult);

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('file-upload/');
  }

  async uploadStandardFile(filepath: string) {
    await this.standardInput.setInputFiles(filepath);
  }

  async getStandardUploadResult(): Promise<string | null> {
    return await this.standardResult.textContent();
  }

  async uploadDragDropFile(filepath: string) {
    await this.dragDropInput.setInputFiles(filepath);
  }

  async getDragDropUploadResult(): Promise<string | null> {
    return await this.dragDropResult.textContent();
  }

  async uploadCustomFile(filepath: string) {
    await this.customInput.setInputFiles(filepath);
  }

  async getCustomUploadResult(): Promise<string | null> {
    return await this.customResult.textContent();
  }
}
