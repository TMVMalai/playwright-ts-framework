import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export async function click(locator: Locator, elementName = 'element'): Promise<void> {
  await expect(locator, `${elementName} should be visible before clicking`).toBeVisible();
  await locator.click();
}

export async function sendText(locator: Locator, value: string, elementName :string): Promise<void> {
  await expect(locator, elementName + " should be visible before entering text").toBeVisible();
  await locator.fill(value);
}

export async function getText(locator: Locator): Promise<string> {
  await expect(locator).toBeVisible();
  return (await locator.innerText()).trim();
}

export async function login(page: Page, email: string, password: string): Promise<void> {
  await page.locator("//input[@type='email']").fill(email);
  await page.locator("//input[@type='password']").fill(password);
  await page.locator("//button[text()='Login']").click();
}

export async function switchToWindowByIndex(
  context: BrowserContext,
  index: number
): Promise<Page> {
  const allPages: Page[] = context.pages();

  if (index < 0 || index >= allPages.length) {
    throw new Error(`Invalid window index: ${index}`);
  }

  const reqWindow: Page = allPages[index];

  await reqWindow.bringToFront();

  return reqWindow;
}

export async function acceptJavaScriptAlert(page: Page): Promise<void> {
  page.once('dialog', async dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    await dialog.accept();
  });
}

export async function dismissJavaScriptAlert(page: Page): Promise<void> {
  page.once('dialog', async dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    await dialog.dismiss();
  });
}

export async function acceptPromptAlert(page: Page, inputText: string): Promise<void> {
  page.once('dialog', async dialog => {
    console.log(`Prompt message: ${dialog.message()}`);
    await dialog.accept(inputText);
  });
}