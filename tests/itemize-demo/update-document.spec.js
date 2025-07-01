import { test } from '@playwright/test';

test("Upload Document to the Demo page @smoke", async({page}) => {
    await page.goto("https://platform.itemize.dev/home/login");
    await page.waitForTimeout(10000);
    let emailBox = page.locator('input#email');
    await emailBox.fill("demo@itemizecorp.com");
    let passBox = page.locator('input#password[type="password"]');
    await passBox.fill("Itemize123!");
} );