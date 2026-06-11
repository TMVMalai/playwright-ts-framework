import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';
export class LoginPage {
  readonly page: playwright.Page;
  readonly emailIdField: playwright.Locator;
  readonly passwordField: playwright.Locator;
  readonly loginButton: playwright.Locator;
  readonly toastMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.emailIdField = page.locator("//input[@type='email']");
    this.passwordField = page.locator("//input[@type='password']");
    this.loginButton = page.locator("//button[text()='Login']");
    this.toastMessage = page.locator("//div[contains(@class,'Toastify__toast-icon')]//parent::div[@role]");
  }

  async enterEmail(email: string): Promise<void> {
    await helper.sendText(this.emailIdField, email, 'Email field');
  }

  async enterPassword(password: string): Promise<void> {
    await helper.sendText(this.passwordField, password, 'Password field');
  }

  async clickLoginButton(): Promise<void> {
    await helper.click(this.loginButton, 'Login button');
  }

  async getToastMessageText(): Promise<string> {
    return helper.getText(this.toastMessage);
  }
}
