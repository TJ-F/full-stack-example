// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { loginAndGetToken } from './utils/auth';

test.describe('Authenticated User Tee Time Tests', () => {
    test.beforeEach(async ({ page }) => {
        const token = await loginAndGetToken(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);

        await page.goto(process.env.CLIENT_ORIGIN);

        await page.evaluate((token) => {
            localStorage.setItem('token', token);
        }, token);

        await page.reload();
    });


    test('Logged in users can view teetimes page', async ({ page }) => {
        await page.goto(`${process.env.CLIENT_ORIGIN}/tee_times`);
        // wait for at least one instance of the Reserve button
        const buttons = await page.locator('button[name="reserve"]');
        await expect(buttons.first()).toBeVisible();
    });
});

