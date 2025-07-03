import { test, expect } from '@playwright/test';
import { login, ap, settings, page} from "../../globalPageSetup.js"
import { initElements } from '../../globalPageSetup.js';

const documentTypes= ['Folio','Invoice','Purchase Order','Receipt','Utility Bill','Statement'];

test.describe.parallel('Add new Line Items to each Document Type', () => {
  documentTypes.forEach((documentType) =>{
    test(`Adding new line item to document type: ${documentType}`, async ({page}) => {
        await initElements(page); 
    await login.login();
    await settings.navigateToSettings();
    await page.getByRole('menuitem', { name: 'layout Field Management' }).click();
    await page.getByText('Accounts Payable').click();
    await page.getByRole('cell', { name: 'Default ' + documentType }).click();
    await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "View Layout" [level=2]`);
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: '+ Add Line Item Field' }).click();
    await page.locator('div').filter({ hasText: /^Field$/ }).nth(3).click();
    const firstOption = page.locator('.ant-select-item-option').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
    const firstOptionText = await firstOption.innerText();
    console.log(firstOptionText);
    // await page.waitForTimeout(9000);
    const value = page.locator('input#layout_lineItems_fields_4_field.ant-select-selection-search-input').inputValue();
    // await expect(value).toBe(firstOptionText);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('body')).toMatchAriaSnapshot(`- text: "Successfully updated layout: Default ${documentType}"`);
    await expect(page.locator('body')).toMatchAriaSnapshot(`
        - img "check-circle"
        - text: "Successfully updated layout: Default ${documentType}"
        `);
    await page.getByRole('cell', { name: 'Default '+documentType }).click();
    await expect(page.locator('#layout_lineItems')).toMatchAriaSnapshot(`- text: ${firstOptionText}`);
    await expect(page.locator('#app')).toMatchAriaSnapshot(`- text: Quantity`);
    });
    
  });

});