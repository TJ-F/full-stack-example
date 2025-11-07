import { test, expect } from '@playwright/test';
import { loginAndGetToken } from './utils/auth';

test.describe('Authenticated User Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        const token = await loginAndGetToken(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);

        await page.goto(process.env.CLIENT_ORIGIN);

        await page.evaluate((token) => {
            localStorage.setItem('token', token);
        }, token);

        await page.reload();
    });

    test('authenticated user has logout navbar item', async ({ page }) => {
        // await expect(page).toHaveURL('http://localhost:3000/tee_times');
        const button = await page.locator('button[name="logout"]');
        await expect(button).toBeVisible();
    });


    // Test that the "Account Management" button is visible
    test('authenticated user has account management button by name attribute', async ({ page }) => {
        const button = await page.locator('button[name="account_management"]');
        await expect(button).toBeVisible();
    });

    // Test that clicking the "Account Management" button triggers navigation or modal (if applicable)
    test('clicking account management button triggers handler', async ({ page }) => {
        const button = await page.locator('button[name="account_management"]');
        await expect(button).toBeVisible();
        await button.click();
    });

    // Test that the button has the correct classes
    test('account management button has correct classes', async ({ page }) => {
        const button = await page.locator('button[name="account_management"]');
        await expect(button).toHaveClass(/btn-outline-light/);
        await expect(button).toHaveClass(/btn-sm/);
    });
});
