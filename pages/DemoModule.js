import { BasePage } from "./BasePage.js";
import { expect } from '@playwright/test';

export class DemoModule extends BasePage {
    constructor(page) {
        super(page);
        this.emailBox = page.getByRole('textbox', { name: '* Email' });
        this.passwordBox = page.getByRole('textbox', { name: '* Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.experimentIcon = page.getByRole('img', { name: 'experiment' }).locator('svg');
        this.fileInput = page.locator('//input[@type="file"]');
        this.appContainer = page.locator('#app');
        this.form = page.locator('form');
        this.avatar = page.locator('.ant-avatar').first();
        this.uploadButton = page.getByRole('button', { name: 'upload', exact: true });
    }

    async gotoLogin() {
        await this.page.goto('https://platform.itemize.dev/home/login');
    }

    async login(email, password) {
        await this.emailBox.click();
        await this.emailBox.fill(email);
        await this.passwordBox.click();
        await this.passwordBox.press('CapsLock');
        await this.passwordBox.fill('I');
        await this.passwordBox.press('CapsLock');
        await this.passwordBox.fill(password);
        await this.passwordBox.press('Enter');
        await this.submitButton.click();
    }

    async clickExperimentIcon() {
        await this.experimentIcon.click();
    }

    async uploadFile(filePath) {
        await this.fileInput.setInputFiles(filePath);
    }

    async expectFileUploaded(filename) {
        await expect(this.appContainer).toMatchAriaSnapshot(`- text: ${filename}`);
    }

    async expectInvoiceForm() {
        await expect(this.form).toMatchAriaSnapshot(`- text: Invoice`);
    }

    async expectLineItemsForm() {
        await expect(this.form).toMatchAriaSnapshot(`\n    - separator: Line Items\n    - text: Date\n    - textbox \"Date\"\n    - img \"calendar\"\n    - text: Description\n    - textbox \"Description\": /IntelliJ IDEA Commercial annual subscription Ultimate Valid through \\d+\\.\\d+\\.\\d+/\n    - text: Quantity\n    - button \"Increase Value\":\n      - img \"up\"\n    - button \"Decrease Value\":\n      - img \"down\"\n    - spinbutton \"Quantity\"\n    - text: Unit Price\n    - button \"Increase Value\":\n      - img \"up\"\n    - button \"Decrease Value\":\n      - img \"down\"\n    - spinbutton \"Unit Price\"\n    - text: Tax\n    - button \"Increase Value\":\n      - img \"up\"\n    - button \"Decrease Value\":\n      - img \"down\"\n    - spinbutton \"Tax\"\n    - button \"Remove\"\n    - button \"Add Item\"\n    `);
    }

    async clickAvatar() {
        await this.avatar.click();
    }

    async clickUploadButton() {
        await this.uploadButton.click();
    }

    async uploadDemoFile(filePath) {
        await this.uploadButton.setInputFiles(filePath);
    }

    async gotoAPDocuments() {
        await this.page.goto('https://platform.itemize.dev/home/accounts-payable/documents');
    }
} 