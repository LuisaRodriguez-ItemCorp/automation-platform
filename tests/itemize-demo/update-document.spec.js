import { test, expect } from '@playwright/test';
import { login, ap, page} from "../../globalPageSetup.js"
import { initElements } from '../../globalPageSetup.js';

test('Upload Document via Demo Module @smoke', async ({ page }) => {
  await page.goto('https://platform.itemize.dev/home/login');
  await page.getByRole('textbox', { name: '* Email' }).click();
  await page.getByRole('textbox', { name: '* Email' }).fill('demo@itemizecorp.com');
  await page.getByRole('textbox', { name: '* Password' }).click();
  await page.getByRole('textbox', { name: '* Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: '* Password' }).fill('I');
  await page.getByRole('textbox', { name: '* Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: '* Password' }).fill('Itemize123!');
  await page.getByRole('textbox', { name: '* Password' }).press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('img', { name: 'experiment' }).locator('svg').click();
  await page.locator('//input[@type="file"]').setInputFiles('C:\\Users\\luisa.alfonso\\Desktop\\Sample Documents - For Testing purposes\\OCR Samples\\U S A\\USA Invoices\\jetbrains Y2017_06.pdf');
  await expect(page.locator('#app')).toMatchAriaSnapshot(`- text: jetbrains Y2017_06.pdf`);
  await page.waitForTimeout(20000);
  await expect(page.locator('form')).toMatchAriaSnapshot(`- text: Invoice`);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - separator: Line Items
    - text: Date
    - textbox "Date"
    - img "calendar"
    - text: Description
    - textbox "Description": /IntelliJ IDEA Commercial annual subscription Ultimate Valid through \\d+\\.\\d+\\.\\d+/
    - text: Quantity
    - button "Increase Value":
      - img "up"
    - button "Decrease Value":
      - img "down"
    - spinbutton "Quantity"
    - text: Unit Price
    - button "Increase Value":
      - img "up"
    - button "Decrease Value":
      - img "down"
    - spinbutton "Unit Price"
    - text: Tax
    - button "Increase Value":
      - img "up"
    - button "Decrease Value":
      - img "down"
    - spinbutton "Tax"
    - button "Remove"
    - button "Add Item"
    `);
  await page.goto('https://platform.itemize.dev/home/demo/upload');
});

test('Upload Document via AP module', async ({page})=>{
  await initElements(page); 
  await login.login();
  await ap.navigateToAP();
  await page.locator('.ant-upload-select input[type="file"]').setInputFiles('test-data/test-docs/jetbrains Y2017_06.pdf');
  await page.locator('div').filter({ hasText: 'jetbrains Y2017_06' }).nth(3).click();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - img "check-circle"
    - text: jetbrains Y2017_06.pdf file uploaded successfully
    `);
  await expect( page.locator('table span.ant-tag-blue:has-text("Processing")').first()).toBeVisible();
});