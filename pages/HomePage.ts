import * as playwright from 'playwright';
import * as helper from '../utils/helperFunctions';

export class HomePage {
  readonly page: playwright.Page;
  readonly signupLoginLink: playwright.Locator;
  readonly contactUsLink: playwright.Locator;
  readonly productsLink: playwright.Locator;
  readonly logoutLink: playwright.Locator;
  readonly loggedInUsername: (name:string) =>playwright.Locator;
  readonly subscriptionEmailField: playwright.Locator;
  readonly subscriptionButton: playwright.Locator;
  readonly categoryLink: (categoryName: string) => playwright.Locator;
  readonly subCategoryLink: (subCategoryName: string) => playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.signupLoginLink = page.locator("//a[contains(normalize-space(),'Signup')]");
    this.contactUsLink = page.locator("//a[contains(normalize-space(),'Contact')]");
    this.productsLink = page.locator("//a[contains(normalize-space(),'Products')]");
    this.logoutLink = page.locator("//a[contains(normalize-space(),'Logout')]");
    this.loggedInUsername = (name:string) => page.locator("//b[contains(text(),'"+name+"')]//ancestor::li");
    this.subscriptionEmailField = page.locator("//input[@id='susbscribe_email']");
    this.subscriptionButton = page.locator("//button[@id='subscribe']");
    this.categoryLink = (categoryName: string) =>
      page.locator(`//a[contains(normalize-space(),'${categoryName}')]`);
    this.subCategoryLink = (subCategoryName: string) =>
      page.locator(`//a[contains(normalize-space(),'${subCategoryName}')]`);
    this.successMessage = page.locator("//div[contains(@class,'alert-success')]");
  }

  async clickSignupLogin(): Promise<void> {
    await helper.click(this.signupLoginLink, 'Signup/Login link');
  }

  async clickContactUs(): Promise<void> {
    await helper.click(this.contactUsLink, 'Contact Us link');
  }

  async clickProducts(): Promise<void> {
    await helper.click(this.productsLink, 'Products link');
  }

  async clickLogout(): Promise<void> {
    await helper.click(this.logoutLink, 'Logout link');
  }

  async isLoggedInUsernameVisible(name:string): Promise<boolean> {
    return await this.loggedInUsername(name).isVisible();
  }

  async scrollToFooter(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(1000);
  }

  async enterSubscriptionEmail(email: string): Promise<void> {
    await helper.sendText(this.subscriptionEmailField, email, 'Subscription email field');
  }

  async clickSubscribe(): Promise<void> {
    await helper.click(this.subscriptionButton, 'Subscribe button');
  }

  async getSuccessMessage(): Promise<string> {
    return helper.getText(this.successMessage);
  }

  async clickCategory(categoryName: string): Promise<void> {
    await helper.click(this.categoryLink(categoryName), `${categoryName} category`);
  }

  async clickSubCategory(subCategoryName: string): Promise<void> {
    await helper.click(this.subCategoryLink(subCategoryName), `${subCategoryName} sub-category`);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
