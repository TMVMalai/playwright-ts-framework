import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class ContactUsPage {
  readonly page: playwright.Page;
  readonly nameField: playwright.Locator;
  readonly emailField: playwright.Locator;
  readonly subjectField: playwright.Locator;
  readonly messageField: playwright.Locator;
  readonly uploadFileInput: playwright.Locator;
  readonly submitButton: playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.nameField = page.locator("//input[@data-qa='name']");
    this.emailField = page.locator("//input[@data-qa='email']");
    this.subjectField = page.locator("//input[@data-qa='subject']");
    this.messageField = page.locator("//textarea[@data-qa='message']");
    this.uploadFileInput = page.locator("//input[@name='upload_file']");
    this.submitButton = page.locator("//input[@data-qa='submit-button']");
    this.successMessage = page.locator("//div[contains(@class,'alert-success')]");
  }

  async enterName(name: string): Promise<void> {
    await helper.sendText(this.nameField, name, 'Name field');
  }

  async enterEmail(email: string): Promise<void> {
    await helper.sendText(this.emailField, email, 'Email field');
  }

  async enterSubject(subject: string): Promise<void> {
    await helper.sendText(this.subjectField, subject, 'Subject field');
  }

  async enterMessage(message: string): Promise<void> {
    await helper.sendText(this.messageField, message, 'Message field');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async clickSubmit(): Promise<void> {
    await helper.click(this.submitButton, 'Submit button');
  }

  async getSuccessMessage(): Promise<string> {
    return helper.getText(this.successMessage);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
