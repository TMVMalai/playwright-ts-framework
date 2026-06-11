import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class LoginModule {
   loginPage: LoginPage;
   data: any;

  constructor(data: any, page: Page) {
    this.loginPage = new LoginPage(page);
    this.data = data;
  }

  async login(): Promise<void> {
    await this.loginPage.enterEmail(this.data.email);
    await this.loginPage.enterPassword(this.data.password);
    await this.loginPage.clickLoginButton();

    const actualToastMessage = await this.loginPage.getToastMessageText();
    expect(actualToastMessage, 'Toast message should match').toBe(this.data.toastMessage);
  }
}