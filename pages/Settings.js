import { BasePage } from "./BasePage.js"
import { expect } from '@playwright/test';


export class Settings extends BasePage{

    constructor(page){
        super(page);
        this.settingsModule = page.locator('div:nth-child(8) > div > .ant-avatar');
        this.fieldManagementMenu = page.getByRole('menuitem', { name: 'layout Field Management' });
        this.accountsPayableMenu = page.getByText('Accounts Payable');
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.addLineItemButton = page.getByRole('button', { name: '+ Add Line Item Field' });
        this.firstFieldOption = page.locator('.ant-select-item-option').first();
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.body = page.locator('body');
        this.layoutLineItems = page.locator('#layout_lineItems');
        this.appContainer = page.locator('#app');
    }

    async navigateToSettings(){
        await this.settingsModule.click();
    }

    async openFieldManagement() {
        await this.fieldManagementMenu.click();
    }

    async openAccountsPayable() {
        await this.accountsPayableMenu.click();
    }

    async selectDocumentType(documentType) {
        await this.page.getByRole('cell', { name: 'Default ' + documentType }).click();
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async clickAddLineItem() {
        await this.addLineItemButton.click();
        await this.page.locator('div').filter({ hasText: /^Field$/ }).nth(3).click();
    }

    async selectFirstFieldOption() {
        await this.firstFieldOption.waitFor({ state: 'visible' });
        await this.firstFieldOption.click();
        return await this.firstFieldOption.innerText();
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectSuccessMessage(documentType) {
        await expect(this.body).toMatchAriaSnapshot(`- text: "Successfully updated layout: Default ${documentType}"`);
        await expect(this.body).toMatchAriaSnapshot(`\n        - img "check-circle"\n        - text: "Successfully updated layout: Default ${documentType}"\n        `);
    }

    async expectLineItemField(firstOptionText) {
        await expect(this.layoutLineItems).toMatchAriaSnapshot(`- text: ${firstOptionText}`);
        await expect(this.appContainer).toMatchAriaSnapshot(`- text: Quantity`);
    }
}