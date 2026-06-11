import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class CheckoutPage {
  readonly page: playwright.Page;
  readonly deliveryAddressName: playwright.Locator;
  readonly deliveryAddressAddress1: playwright.Locator;
  readonly deliveryAddressCity: playwright.Locator;
  readonly deliveryAddressState: playwright.Locator;
  readonly deliveryAddressZipcode: playwright.Locator;
  readonly deliveryAddressCountry: playwright.Locator;
  readonly reviewOrderProduct: playwright.Locator;
  readonly reviewOrderPrice: playwright.Locator;
  readonly reviewOrderQuantity: playwright.Locator;
  readonly reviewOrderTotal: playwright.Locator;
  readonly commentTextArea: playwright.Locator;
  readonly placeOrderButton: playwright.Locator;
  readonly nameOnCardField: playwright.Locator;
  readonly cardNumberField: playwright.Locator;
  readonly cvcField: playwright.Locator;
  readonly expiryMonthField: playwright.Locator;
  readonly expiryYearField: playwright.Locator;
  readonly payAndConfirmButton: playwright.Locator;
  readonly successMessage: playwright.Locator;
  readonly loginRegisterMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.deliveryAddressName = page.locator("//h3[contains(normalize-space(),'Name')]");
    this.deliveryAddressAddress1 = page.locator("//h3[contains(normalize-space(),'Address')]");
    this.deliveryAddressCity = page.locator("//li[contains(normalize-space(),'City:')]");
    this.deliveryAddressState = page.locator("//li[contains(normalize-space(),'State:')]");
    this.deliveryAddressZipcode = page.locator("//li[contains(normalize-space(),'Zipcode:')]");
    this.deliveryAddressCountry = page.locator("//li[contains(normalize-space(),'Country:')]");
    this.reviewOrderProduct = page.locator("//table//td[@class='cart_product']//p");
    this.reviewOrderPrice = page.locator("//table//td[@class='cart_price']//p");
    this.reviewOrderQuantity = page.locator("//table//td[@class='cart_quantity']//button");
    this.reviewOrderTotal = page.locator("//table//td[@class='cart_total']//p");
    this.commentTextArea = page.locator("//textarea[@name='message']");
    this.placeOrderButton = page.locator("//a[contains(normalize-space(),'Place Order')]");
    this.nameOnCardField = page.locator("//input[@data-qa='name-on-card']");
    this.cardNumberField = page.locator("//input[@data-qa='card-number']");
    this.cvcField = page.locator("//input[@data-qa='cvc']");
    this.expiryMonthField = page.locator("//input[@data-qa='expiry-month']");
    this.expiryYearField = page.locator("//input[@data-qa='expiry-year']");
    this.payAndConfirmButton = page.locator("//button[@id='submit']");
    this.successMessage = page.locator("//h2[contains(normalize-space(),'Order Placed Successfully')]");
    this.loginRegisterMessage = page.locator("//b[contains(text(),'Register to checkout')]|//b[contains(text(),'Login to checkout')]");
  }

  async getDeliveryAddressName(): Promise<string> {
    return helper.getText(this.deliveryAddressName);
  }

  async getDeliveryAddressAddress(): Promise<string> {
    return helper.getText(this.deliveryAddressAddress1);
  }

  async getDeliveryAddressCity(): Promise<string> {
    return helper.getText(this.deliveryAddressCity);
  }

  async getDeliveryAddressState(): Promise<string> {
    return helper.getText(this.deliveryAddressState);
  }

  async getDeliveryAddressZipcode(): Promise<string> {
    return helper.getText(this.deliveryAddressZipcode);
  }

  async getDeliveryAddressCountry(): Promise<string> {
    return helper.getText(this.deliveryAddressCountry);
  }

  async isDeliveryAddressVisible(): Promise<boolean> {
    return await this.deliveryAddressName.isVisible();
  }

  async getReviewOrderProductName(index: number = 0): Promise<string> {
    return helper.getText(this.reviewOrderProduct.nth(index));
  }

  async getReviewOrderProductPrice(index: number = 0): Promise<string> {
    return helper.getText(this.reviewOrderPrice.nth(index));
  }

  async getReviewOrderProductQuantity(index: number = 0): Promise<string> {
    return helper.getText(this.reviewOrderQuantity.nth(index));
  }

  async getReviewOrderProductTotal(index: number = 0): Promise<string> {
    return helper.getText(this.reviewOrderTotal.nth(index));
  }

  async isReviewOrderVisible(): Promise<boolean> {
    return await this.reviewOrderProduct.first().isVisible();
  }

  async enterComment(comment: string): Promise<void> {
    await helper.sendText(this.commentTextArea, comment, 'Comment text area');
  }

  async clickPlaceOrder(): Promise<void> {
    await helper.click(this.placeOrderButton, 'Place Order button');
    await this.page.waitForTimeout(1000);
  }

  async enterNameOnCard(name: string): Promise<void> {
    await helper.sendText(this.nameOnCardField, name, 'Name on card field');
  }

  async enterCardNumber(cardNumber: string): Promise<void> {
    await helper.sendText(this.cardNumberField, cardNumber, 'Card number field');
  }

  async enterCvc(cvc: string): Promise<void> {
    await helper.sendText(this.cvcField, cvc, 'CVC field');
  }

  async enterExpiryMonth(month: string): Promise<void> {
    await helper.sendText(this.expiryMonthField, month, 'Expiry month field');
  }

  async enterExpiryYear(year: string): Promise<void> {
    await helper.sendText(this.expiryYearField, year, 'Expiry year field');
  }

  async clickPayAndConfirm(): Promise<void> {
    await helper.click(this.payAndConfirmButton, 'Pay and Confirm button');
    await this.page.waitForTimeout(1000);
  }

  async getSuccessMessage(): Promise<string> {
    return helper.getText(this.successMessage);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async isLoginRegisterMessageVisible(): Promise<boolean> {
    return await this.loginRegisterMessage.isVisible();
  }

  async getLoginRegisterMessage(): Promise<string> {
    return helper.getText(this.loginRegisterMessage);
  }
}
