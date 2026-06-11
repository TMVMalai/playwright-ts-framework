import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class CartPage {
  readonly page: playwright.Page;
  readonly cartTable: playwright.Locator;
  readonly cartProductName: playwright.Locator;
  readonly cartProductPrice: playwright.Locator;
  readonly cartProductQuantity: playwright.Locator;
  readonly cartProductTotal: playwright.Locator;
  readonly removeProductButton: (index: number) => playwright.Locator;
  readonly proceedToCheckoutButton: playwright.Locator;
  readonly emptyCartMessage: playwright.Locator;
  readonly subscriptionEmailField: playwright.Locator;
  readonly subscriptionButton: playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.cartTable = page.locator("//table[@id='cart_info_table']");
    this.cartProductName = page.locator("//td[@class='cart_product']//p");
    this.cartProductPrice = page.locator("//td[@class='cart_price']//p");
    this.cartProductQuantity = page.locator("//td[@class='cart_quantity']//button");
    this.cartProductTotal = page.locator("//td[@class='cart_total']//p");
    this.removeProductButton = (index: number) =>
      page.locator("//a[@class='cart_quantity_delete']").nth(index);
    this.proceedToCheckoutButton = page.locator("//a[contains(normalize-space(),'Proceed To Checkout')]");
    this.emptyCartMessage = page.locator("//b[contains(normalize-space(),'Cart is empty')]");
    this.subscriptionEmailField = page.locator("//input[@id='susbscribe_email']");
    this.subscriptionButton = page.locator("//button[@id='subscribe']");
    this.successMessage = page.locator("//div[contains(@class,'alert-success')]");
  }

  async getProductCount(): Promise<number> {
    return await this.cartProductName.count();
  }

  async getProductName(index: number = 0): Promise<string> {
    return helper.getText(this.cartProductName.nth(index));
  }

  async getProductPrice(index: number = 0): Promise<string> {
    return helper.getText(this.cartProductPrice.nth(index));
  }

  async getProductQuantity(index: number = 0): Promise<string> {
    return helper.getText(this.cartProductQuantity.nth(index));
  }

  async getProductTotal(index: number = 0): Promise<string> {
    return helper.getText(this.cartProductTotal.nth(index));
  }

  async removeProduct(index: number = 0): Promise<void> {
    await helper.click(this.removeProductButton(index), 'Remove product button');
    await this.page.waitForTimeout(1000);
  }

  async proceedToCheckout(): Promise<void> {
    await helper.click(this.proceedToCheckoutButton, 'Proceed To Checkout button');
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
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

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
