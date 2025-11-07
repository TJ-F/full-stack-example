// playwright.config.js
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    timeout: 10000,
    use: {
        baseURL: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 720 },
    },
    testDir: './tests'
});