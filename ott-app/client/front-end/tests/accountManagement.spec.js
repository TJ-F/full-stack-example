// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { loginAndGetToken } from './utils/auth';

test.beforeEach(async ({ page }) => {
  const token = await loginAndGetToken(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);

  await page.goto(process.env.CLIENT_ORIGIN);

  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, token);

  await page.reload();
});

test('user can view account management page', async ({ page }) => {
    await page.goto(`${process.env.CLIENT_ORIGIN}/account_management`);

    // Check if the page has loaded by looking for a specific element
    await expect(page.locator('h2')).toHaveText(/Edit Account/);
    await expect(page.locator('h2')).not.toHaveText(/Create Account/);
});