import { test, expect } from '@playwright/test';
import { loginAndGetToken } from './utils/auth';

test.describe('Logout Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const token = await loginAndGetToken(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);

        await page.goto(process.env.CLIENT_ORIGIN);

        await page.evaluate((token) => {
            localStorage.setItem('token', token);
        }, token);

        await page.reload();
    });

    test('should log out the user and redirect to login page', async ({ page }) => {
        await page.click('button[name="logout"]');
        await expect(page).toHaveURL(process.env.CLIENT_ORIGIN); // Adjust as needed
        // Check the login button reappears
        await expect(page.locator('text=Login')).toBeVisible();
    });
});