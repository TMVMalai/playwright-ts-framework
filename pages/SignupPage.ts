import * as playwright from '@playwright/test';
import * as helper from '../utils/helperFunctions';

export class SignupPage {
  readonly page: playwright.Page;
  readonly titleRadioButton:(value:string)=> playwright.Locator;
  readonly passwordField: playwright.Locator;
  readonly dayDropdown: playwright.Locator;
  readonly monthDropdown: playwright.Locator;
  readonly yearDropdown: playwright.Locator;
  readonly newsletterCheckbox: playwright.Locator;
  readonly offersCheckbox: playwright.Locator;
  readonly firstNameField: playwright.Locator;
  readonly lastNameField: playwright.Locator;
  readonly companyField: playwright.Locator;
  readonly addressField: playwright.Locator;
  readonly countryDropdown: playwright.Locator;
  readonly stateField: playwright.Locator;
  readonly cityField: playwright.Locator;
  readonly zipcodeField: playwright.Locator;
  readonly mobileNumberField: playwright.Locator;
  readonly createAccountButton: playwright.Locator;
  readonly successMessage: playwright.Locator;

  constructor(page: playwright.Page) {
    this.page = page;
    this.titleRadioButton = (value: string) => page.locator(`//div[@data-qa='title']//span//input[@value='${value}']`);
    this.passwordField = page.locator("//input[@data-qa='password']");
    this.dayDropdown = page.locator("//select[@data-qa='days']");
    this.monthDropdown = page.locator("//select[@data-qa='months']");
    this.yearDropdown = page.locator("//select[@data-qa='years']");
    this.newsletterCheckbox = page.locator("//input[@id='newsletter']");
    this.offersCheckbox = page.locator("//input[@id='optin']");
    this.firstNameField = page.locator("//input[@data-qa='first_name']");
    this.lastNameField = page.locator("//input[@data-qa='last_name']");
    this.companyField = page.locator("//input[@data-qa='company']");
    this.addressField = page.locator("//input[@data-qa='address']");
    this.countryDropdown = page.locator("//select[@data-qa='country']");
    this.stateField = page.locator("//input[@data-qa='state']");
    this.cityField = page.locator("//input[@data-qa='city']");
    this.zipcodeField = page.locator("//input[@data-qa='zipcode']");
    this.mobileNumberField = page.locator("//input[@data-qa='mobile_number']");
    this.createAccountButton = page.locator("//button[@data-qa='create-account']");
    this.successMessage = page.locator("//h2[contains(normalize-space(),'Account Created')]");
  }

  async selectTitle(title: string): Promise<void> {
    await helper.checkRadioButton(this.titleRadioButton(title),'Title dropdown');
  }

  async enterPassword(password: string): Promise<void> {
    await helper.sendText(this.passwordField, password, 'Password field');
  }

  async selectDay(day: string): Promise<void> {
    await helper.selectDropdownByValue(this.dayDropdown, day, 'Day dropdown');
  }

  async selectMonth(month: string): Promise<void> {
    await helper.selectDropdownByValue(this.monthDropdown, month, 'Month dropdown');
  }

  async selectYear(year: string): Promise<void> {
    await helper.selectDropdownByValue(this.yearDropdown, year, 'Year dropdown');
  }

  async checkNewsletterCheckbox(): Promise<void> {
    await helper.click(this.newsletterCheckbox, 'Newsletter checkbox');
  }

  async checkOffersCheckbox(): Promise<void> {
    await helper.click(this.offersCheckbox, 'Offers checkbox');
  }

  async enterFirstName(firstName: string): Promise<void> {
    await helper.sendText(this.firstNameField, firstName, 'First name field');
  }

  async enterLastName(lastName: string): Promise<void> {
    await helper.sendText(this.lastNameField, lastName, 'Last name field');
  }

  async enterCompany(company: string): Promise<void> {
    await helper.sendText(this.companyField, company, 'Company field');
  }

  async enterAddress(address: string): Promise<void> {
    await helper.sendText(this.addressField, address, 'Address field');
  }

  async selectCountry(country: string): Promise<void> {
    await helper.selectDropdownByValue(this.countryDropdown, country, 'Country dropdown');
  }

  async enterState(state: string): Promise<void> {
    await helper.sendText(this.stateField, state, 'State field');
  }

  async enterCity(city: string): Promise<void> {
    await helper.sendText(this.cityField, city, 'City field');
  }

  async enterZipcode(zipcode: string): Promise<void> {
    await helper.sendText(this.zipcodeField, zipcode, 'Zipcode field');
  }

  async enterMobileNumber(mobileNumber: string): Promise<void> {
    await helper.sendText(this.mobileNumberField, mobileNumber, 'Mobile number field');
  }

  async clickCreateAccountButton(): Promise<void> {
    await helper.click(this.createAccountButton, 'Create Account button');
  }

  async getSuccessMessage(): Promise<string> {
    return helper.getText(this.successMessage);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
