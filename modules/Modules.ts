import { expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ContactUsPage } from '../pages/ContactUsPage';

// ======================== Login Module ========================
export class LoginModule {
  private loginPage: LoginPage;
  private homePage: HomePage;
  private data: any;

  constructor(data: any, page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.data = data;
  }

  async login(): Promise<void> {
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterLoginEmail(this.data.email);
    await this.loginPage.enterLoginPassword(this.data.password);
    await this.loginPage.clickLoginButton();
    await this.loginPage.page.waitForTimeout(1000);

    const isUsernameVisible = await this.homePage.isLoggedInUsernameVisible(this.data.expectedUsername);
    expect(isUsernameVisible, "Logged in "+this.data.expectedUsername+" should be visible").toBe(true);
  }

  async loginWithInvalidCredentials(): Promise<void> {
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterLoginEmail(this.data.email);
    await this.loginPage.enterLoginPassword(this.data.password);
    await this.loginPage.clickLoginButton();
    await this.loginPage.page.waitForTimeout(1000);

    const isErrorMessageVisible = await this.loginPage.isErrorMessageVisible();
    expect(isErrorMessageVisible, 'Error message should be visible for invalid login').toBe(true);

    const actualErrorMessage = await this.loginPage.getErrorMessage();
    expect(actualErrorMessage).toContain(this.data.expectedErrorMessage);
  }

  async logout(): Promise<void> {
    await this.homePage.clickLogout();
    await this.homePage.page.waitForTimeout(1000);
  }
}

// ======================== Signup Module ========================
export class SignupModule {
  private loginPage: LoginPage;
  private signupPage: SignupPage;
  private homePage: HomePage;
  private data: any;

  constructor(data: any, page: Page) {
    this.loginPage = new LoginPage(page);
    this.signupPage = new SignupPage(page);
    this.homePage = new HomePage(page);
    this.data = data;
  }

  async signupNewUser(): Promise<void> {
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterSignupName(this.data.signupName);
    await this.loginPage.enterSignupEmail(this.data.signupEmail);
    await this.loginPage.clickSignupButton();
    await this.loginPage.page.waitForTimeout(1000);

    // Fill account information
    await this.signupPage.selectTitle(this.data.title);
    await this.signupPage.enterPassword(this.data.password);
    await this.signupPage.selectDay(this.data.day);
    await this.signupPage.selectMonth(this.data.month);
    await this.signupPage.selectYear(this.data.year);

    if (this.data.newsletter === 'true') {
      await this.signupPage.checkNewsletterCheckbox();
    }

    if (this.data.offers === 'true') {
      await this.signupPage.checkOffersCheckbox();
    }

    // Fill personal details
    await this.signupPage.enterFirstName(this.data.firstName);
    await this.signupPage.enterLastName(this.data.lastName);
    await this.signupPage.enterCompany(this.data.company);
    await this.signupPage.enterAddress(this.data.address);
    await this.signupPage.selectCountry(this.data.country);
    await this.signupPage.enterState(this.data.state);
    await this.signupPage.enterCity(this.data.city);
    await this.signupPage.enterZipcode(this.data.zipcode);
    await this.signupPage.enterMobileNumber(this.data.mobileNumber);

    await this.signupPage.clickCreateAccountButton();
    await this.signupPage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.signupPage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Success message should be visible after account creation').toBe(true);

    const actualSuccessMessage = await this.signupPage.getSuccessMessage();
    expect(actualSuccessMessage).toContain(this.data.expectedSuccessMessage);
  }
}

// ======================== Product Search Module ========================
export class ProductSearchModule {
  private homePage: HomePage;
  private productPage: ProductPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.data = data;
  }

  async searchProduct(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.searchProduct(this.data.productName);

    const productCount = await this.productPage.getProductCount();
    expect(productCount, 'Search results should display products').toBeGreaterThan(0);
  }

  async viewProductDetails(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.viewFirstProduct();
    await this.homePage.page.waitForTimeout(1000);

    const isProductDetailsVisible = await this.productPage.isProductDetailsVisible();
    expect(isProductDetailsVisible, 'Product details should be visible').toBe(true);

    const productName = await this.productPage.getProductName();
    expect(productName.length, 'Product name should be displayed').toBeGreaterThan(0);

    const productPrice = await this.productPage.getProductPrice();
    expect(productPrice.length, 'Product price should be displayed').toBeGreaterThan(0);

    const productAvailability = await this.productPage.getProductAvailability();
    expect(productAvailability.length, 'Product availability should be displayed').toBeGreaterThan(0);

    const productBrand = await this.productPage.getProductBrand();
    expect(productBrand.length, 'Product brand should be displayed').toBeGreaterThan(0);
  }

  async filterByBrand(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.clickBrand(this.data.brandName);
    await this.homePage.page.waitForTimeout(1000);

    const productCount = await this.productPage.getProductCount();
    expect(productCount, 'Brand filtered products should be displayed').toBeGreaterThan(0);
  }

  async filterByCategory(): Promise<void> {
    await this.homePage.page.goto('/');
    await this.homePage.page.waitForTimeout(500);

    await this.homePage.clickCategory(this.data.categoryName);
    await this.homePage.page.waitForTimeout(500);

    await this.homePage.clickSubCategory(this.data.subCategoryName);
    await this.homePage.page.waitForTimeout(1000);

    const productCount = await this.productPage.getProductCount();
    expect(productCount, 'Category filtered products should be displayed').toBeGreaterThan(0);
  }
}

// ======================== Add to Cart Module ========================
export class AddToCartModule {
  private homePage: HomePage;
  private productPage: ProductPage;
  private cartPage: CartPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.data = data;
  }

  async addProductToCart(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.viewFirstProduct();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addToCart();

    // Accept alert if displayed
    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    const productCount = await this.cartPage.getProductCount();
    expect(productCount, 'Product should be displayed in cart').toBeGreaterThanOrEqual(1);

    const cartProductPrice = await this.cartPage.getProductPrice();
    expect(cartProductPrice.length, 'Product price should be visible in cart').toBeGreaterThan(0);

    const cartProductQuantity = await this.cartPage.getProductQuantity();
    expect(cartProductQuantity.length, 'Product quantity should be visible in cart').toBeGreaterThan(0);
  }

  async addProductWithQuantity(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.viewFirstProduct();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.setQuantity(this.data.quantity);
    await this.productPage.addToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    const cartProductQuantity = await this.cartPage.getProductQuantity();
    expect(cartProductQuantity).toContain(this.data.quantity);
  }

  async removeProductFromCart(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addFirstProductToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    const initialProductCount = await this.cartPage.getProductCount();
    expect(initialProductCount, 'Product should be in cart initially').toBeGreaterThanOrEqual(1);

    await this.cartPage.removeProduct(0);

    const isCEmpty = await this.cartPage.isCartEmpty();
    if (isCEmpty) {
      expect(isCEmpty, 'Cart should be empty after removing the only product').toBe(true);
    }
  }
}

// ======================== Checkout Module ========================
export class CheckoutModule {
  private loginPage: LoginPage;
  private homePage: HomePage;
  private productPage: ProductPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.data = data;
  }

  async checkoutWithoutLogin(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addFirstProductToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    await this.cartPage.proceedToCheckout();
    await this.homePage.page.waitForTimeout(1000);

    const isLoginRegisterMessageVisible = await this.checkoutPage.isLoginRegisterMessageVisible();
    expect(
      isLoginRegisterMessageVisible,
      'Application should ask user to login/register before checkout'
    ).toBe(true);
  }

  async checkoutWithLogin(): Promise<void> {
    // First login
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterLoginEmail(this.data.email);
    await this.loginPage.enterLoginPassword(this.data.password);
    await this.loginPage.clickLoginButton();
    await this.homePage.page.waitForTimeout(1000);

    // Add product to cart
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addFirstProductToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    await this.cartPage.proceedToCheckout();
    await this.homePage.page.waitForTimeout(1000);

    // Verify checkout page
    const isDeliveryAddressVisible = await this.checkoutPage.isDeliveryAddressVisible();
    expect(isDeliveryAddressVisible, 'Delivery address should be visible').toBe(true);

    const isReviewOrderVisible = await this.checkoutPage.isReviewOrderVisible();
    expect(isReviewOrderVisible, 'Review order section should be visible').toBe(true);
  }

  async placeOrder(): Promise<void> {
    // First login
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterLoginEmail(this.data.email);
    await this.loginPage.enterLoginPassword(this.data.password);
    await this.loginPage.clickLoginButton();
    await this.homePage.page.waitForTimeout(1000);

    // Add product to cart
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addFirstProductToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    await this.cartPage.proceedToCheckout();
    await this.homePage.page.waitForTimeout(1000);

    // Enter order comment and place order
    await this.checkoutPage.enterComment(this.data.orderComment);
    await this.checkoutPage.clickPlaceOrder();
    await this.homePage.page.waitForTimeout(1000);

    // Enter payment details
    await this.checkoutPage.enterNameOnCard(this.data.nameOnCard);
    await this.checkoutPage.enterCardNumber(this.data.cardNumber);
    await this.checkoutPage.enterCvc(this.data.cvc);
    await this.checkoutPage.enterExpiryMonth(this.data.expiryMonth);
    await this.checkoutPage.enterExpiryYear(this.data.expiryYear);

    await this.checkoutPage.clickPayAndConfirm();
    await this.homePage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.checkoutPage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Order placed success message should be displayed').toBe(true);

    const successMessage = await this.checkoutPage.getSuccessMessage();
    expect(successMessage).toContain(this.data.expectedSuccessMessage);
  }
}

// ======================== Contact Us Module ========================
export class ContactUsModule {
  private homePage: HomePage;
  private contactUsPage: ContactUsPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.homePage = new HomePage(page);
    this.contactUsPage = new ContactUsPage(page);
    this.data = data;
  }

  async submitContactForm(): Promise<void> {
    await this.homePage.clickContactUs();
    await this.homePage.page.waitForTimeout(500);

    await this.contactUsPage.enterName(this.data.name);
    await this.contactUsPage.enterEmail(this.data.email);
    await this.contactUsPage.enterSubject(this.data.subject);
    await this.contactUsPage.enterMessage(this.data.message);

    if (this.data.filePath) {
      await this.contactUsPage.uploadFile(this.data.filePath);
    }

    await this.contactUsPage.clickSubmit();

    // Handle alert
    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.homePage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.contactUsPage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Success message should be displayed').toBe(true);

    const successMessage = await this.contactUsPage.getSuccessMessage();
    expect(successMessage).toContain(this.data.expectedSuccessMessage);
  }
}

// ======================== Subscription Module ========================
export class SubscriptionModule {
  private homePage: HomePage;
  private cartPage: CartPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
    this.data = data;
  }

  async subscribeFromHomePage(): Promise<void> {
    await this.homePage.page.goto('/');
    await this.homePage.page.waitForTimeout(500);

    await this.homePage.scrollToFooter();

    await this.homePage.enterSubscriptionEmail(this.data.email);
    await this.homePage.clickSubscribe();
    await this.homePage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.homePage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Subscription success message should be displayed').toBe(true);

    const successMessage = await this.homePage.getSuccessMessage();
    expect(successMessage).toContain(this.data.expectedSuccessMessage);
  }

  async subscribeFromCartPage(): Promise<void> {
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    const productPage = new ProductPage(this.homePage.page);
    await productPage.addFirstProductToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    await this.cartPage.scrollToFooter();

    await this.cartPage.enterSubscriptionEmail(this.data.email);
    await this.cartPage.clickSubscribe();
    await this.homePage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.cartPage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Subscription success message should be displayed').toBe(true);

    const successMessage = await this.cartPage.getSuccessMessage();
    expect(successMessage).toContain(this.data.expectedSuccessMessage);
  }
}

// ======================== End-to-End User Journey Module ========================
export class EndToEndModule {
  private homePage: HomePage;
  private loginPage: LoginPage;
  private signupPage: SignupPage;
  private productPage: ProductPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private data: any;

  constructor(data: any, page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.signupPage = new SignupPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.data = data;
  }

  async completeUserJourney(): Promise<void> {
    // Step 1: Signup
    await this.homePage.clickSignupLogin();
    await this.loginPage.enterSignupName(this.data.signupName);
    await this.loginPage.enterSignupEmail(this.data.signupEmail);
    await this.loginPage.clickSignupButton();
    await this.homePage.page.waitForTimeout(1000);

    await this.signupPage.selectTitle(this.data.title);
    await this.signupPage.enterPassword(this.data.password);
    await this.signupPage.selectDay(this.data.day);
    await this.signupPage.selectMonth(this.data.month);
    await this.signupPage.selectYear(this.data.year);

    await this.signupPage.enterFirstName(this.data.firstName);
    await this.signupPage.enterLastName(this.data.lastName);
    await this.signupPage.enterAddress(this.data.address);
    await this.signupPage.selectCountry(this.data.country);
    await this.signupPage.enterState(this.data.state);
    await this.signupPage.enterCity(this.data.city);
    await this.signupPage.enterZipcode(this.data.zipcode);
    await this.signupPage.enterMobileNumber(this.data.mobileNumber);

    await this.signupPage.clickCreateAccountButton();
    await this.homePage.page.waitForTimeout(1000);

    // Step 2: Login
    await this.homePage.page.goto('/');
    await this.homePage.page.waitForTimeout(500);

    await this.homePage.clickSignupLogin();
    await this.loginPage.enterLoginEmail(this.data.signupEmail);
    await this.loginPage.enterLoginPassword(this.data.password);
    await this.loginPage.clickLoginButton();
    await this.homePage.page.waitForTimeout(1000);

    // Step 3: Search product
    await this.homePage.clickProducts();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.searchProduct(this.data.productName);
    const productCount = await this.productPage.getProductCount();
    expect(productCount, 'Search results should display products').toBeGreaterThan(0);

    // Step 4: Add to cart
    await this.productPage.viewFirstProduct();
    await this.homePage.page.waitForTimeout(500);

    await this.productPage.addToCart();

    try {
      await this.homePage.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (e) {
      // No alert displayed
    }

    await this.productPage.clickViewCart();
    await this.homePage.page.waitForTimeout(1000);

    // Step 5: Checkout
    await this.cartPage.proceedToCheckout();
    await this.homePage.page.waitForTimeout(1000);

    const isDeliveryAddressVisible = await this.checkoutPage.isDeliveryAddressVisible();
    expect(isDeliveryAddressVisible, 'Delivery address should be visible').toBe(true);

    // Step 6: Place order
    await this.checkoutPage.enterComment(this.data.orderComment);
    await this.checkoutPage.clickPlaceOrder();
    await this.homePage.page.waitForTimeout(1000);

    await this.checkoutPage.enterNameOnCard(this.data.nameOnCard);
    await this.checkoutPage.enterCardNumber(this.data.cardNumber);
    await this.checkoutPage.enterCvc(this.data.cvc);
    await this.checkoutPage.enterExpiryMonth(this.data.expiryMonth);
    await this.checkoutPage.enterExpiryYear(this.data.expiryYear);

    await this.checkoutPage.clickPayAndConfirm();
    await this.homePage.page.waitForTimeout(1000);

    const isSuccessMessageVisible = await this.checkoutPage.isSuccessMessageVisible();
    expect(isSuccessMessageVisible, 'Order placed success message should be displayed').toBe(true);

    // Step 7: Logout
    await this.homePage.page.goto('/');
    await this.homePage.page.waitForTimeout(500);

    await this.homePage.clickLogout();
    await this.homePage.page.waitForTimeout(1000);

    const isLogoutSuccessful = !(await this.homePage.isLoggedInUsernameVisible());
    expect(isLogoutSuccessful, 'User should be logged out').toBe(true);
  }
}
