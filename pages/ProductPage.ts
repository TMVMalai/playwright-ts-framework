import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class ProductPage {
  readonly page: playwright.Page;
  readonly searchBox: playwright.Locator;
  readonly searchButton: playwright.Locator;
  readonly productList: playwright.Locator;
  readonly firstProduct: playwright.Locator;
  readonly viewProductButton: (index: number) => playwright.Locator;
  readonly productName: playwright.Locator;
  readonly productPrice: playwright.Locator;
  readonly productCategory: playwright.Locator;
  readonly productAvailability: playwright.Locator;
  readonly productCondition: playwright.Locator;
  readonly productBrand: playwright.Locator;
  readonly quantityInput: playwright.Locator;
  readonly addToCartButton: playwright.Locator;
  readonly viewCartLink: playwright.Locator;
  readonly brandFilter: (brandName: string) => playwright.Locator;
  readonly categoryFilter: (categoryName: string) => playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.searchBox = page.locator("//input[@id='search_product']");
    this.searchButton = page.locator("//button[@id='submit_search']");
    this.productList = page.locator("//div[@class='product-image-wrapper']");
    this.firstProduct = page.locator("//div[@class='product-image-wrapper']").first();
    this.viewProductButton = (index: number) =>
      page.locator("//a[contains(normalize-space(),'View Product')]").nth(index);
    this.productName = page.locator("//div[@class='product-details']//h2");
    this.productPrice = page.locator("//span[contains(normalize-space(),'Rs.')]/parent::b");
    this.productCategory = page.locator("//p[contains(normalize-space(),'Category:')]");
    this.productAvailability = page.locator("//p[contains(normalize-space(),'Availability:')]");
    this.productCondition = page.locator("//p[contains(normalize-space(),'Condition:')]");
    this.productBrand = page.locator("//p[contains(normalize-space(),'Brand:')]");
    this.quantityInput = page.locator("//input[@id='quantity']");
    this.addToCartButton = page.locator("//button[contains(normalize-space(),'Add to cart')]");
    this.viewCartLink = page.locator("//u[contains(normalize-space(),'View Cart')]");
    this.brandFilter = (brandName: string) =>
      page.locator(`//a[contains(normalize-space(),'${brandName}')]`);
    this.categoryFilter = (categoryName: string) =>
      page.locator(`//a[contains(normalize-space(),'${categoryName}')]`);
    this.successMessage = page.locator("//div[contains(@class,'alert-success')]");
  }

  async searchProduct(productName: string): Promise<void> {
    await helper.sendText(this.searchBox, productName, 'Search box');
    await helper.click(this.searchButton, 'Search button');
    await this.page.waitForTimeout(1000);
  }

  async viewFirstProduct(): Promise<void> {
    await helper.click(this.viewProductButton(0), 'View Product button');
  }

  async viewProductByIndex(index: number): Promise<void> {
    await helper.click(this.viewProductButton(index), 'View Product button');
  }

  async getProductName(): Promise<string> {
    return helper.getText(this.productName);
  }

  async getProductPrice(): Promise<string> {
    return helper.getText(this.productPrice);
  }

  async getProductCategory(): Promise<string> {
    return helper.getText(this.productCategory);
  }

  async getProductAvailability(): Promise<string> {
    return helper.getText(this.productAvailability);
  }

  async getProductCondition(): Promise<string> {
    return helper.getText(this.productCondition);
  }

  async getProductBrand(): Promise<string> {
    return helper.getText(this.productBrand);
  }

  async isProductDetailsVisible(): Promise<boolean> {
    return await this.productName.isVisible();
  }

  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill('');
    await helper.sendText(this.quantityInput, quantity, 'Quantity input');
  }

  async addToCart(): Promise<void> {
    await helper.click(this.addToCartButton, 'Add to Cart button');
    await this.page.waitForTimeout(1000);
  }

  async addFirstProductToCart(): Promise<void> {
    await helper.click(this.firstProduct, 'First product');
    await helper.click(this.addToCartButton, 'Add to Cart button');
    await this.page.waitForTimeout(1000);
  }

  async clickViewCart(): Promise<void> {
    await helper.click(this.viewCartLink, 'View Cart link');
  }

  async clickBrand(brandName: string): Promise<void> {
    await helper.click(this.brandFilter(brandName), `${brandName} brand`);
  }

  async clickCategory(categoryName: string): Promise<void> {
    await helper.click(this.categoryFilter(categoryName), `${categoryName} category`);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productList.count();
  }
}
