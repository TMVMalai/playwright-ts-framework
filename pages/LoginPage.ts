import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class LoginPage {
  readonly page: playwright.Page;
  readonly loginEmailField: playwright.Locator;
  readonly loginPasswordField: playwright.Locator;
  readonly loginButton: playwright.Locator;
  readonly signupNameField: playwright.Locator;
  readonly signupEmailField: playwright.Locator;
  readonly signupButton: playwright.Locator;
  readonly errorMessage: playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.loginEmailField = page.locator("//input[@data-qa='login-email']");
    this.loginPasswordField = page.locator("//input[@data-qa='login-password']");
    this.loginButton = page.locator("//button[@data-qa='login-button']");
    this.signupNameField = page.locator("//input[@data-qa='signup-name']");
    this.signupEmailField = page.locator("//input[@data-qa='signup-email']");
    this.signupButton = page.locator("//button[@data-qa='signup-button']");
    this.errorMessage = page.locator("//form//p[contains(text(),'email or password is incorrect')]");
    this.successMessage = page.locator("//div[contains(@class,'alert-success')]");
  }

  async enterLoginEmail(email: string): Promise<void> {
    await helper.sendText(this.loginEmailField, email, 'Login email field');
  }

  async enterLoginPassword(password: string): Promise<void> {
    await helper.sendText(this.loginPasswordField, password, 'Login password field');
  }

  async clickLoginButton(): Promise<void> {
    await helper.click(this.loginButton, 'Login button');
  }

  async enterSignupName(name: string): Promise<void> {
    await helper.sendText(this.signupNameField, name, 'Signup name field');
  }

  async enterSignupEmail(email: string): Promise<void> {
    await helper.sendText(this.signupEmailField, email, 'Signup email field');
  }

  async clickSignupButton(): Promise<void> {
    await helper.click(this.signupButton, 'Signup button');
  }

  async getErrorMessage(): Promise<string> {
    return helper.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async getSuccessMessage(): Promise<string> {
    return helper.getText(this.successMessage);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
