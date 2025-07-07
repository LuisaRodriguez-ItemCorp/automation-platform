import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class AP extends BasePage{

    constructor(page){
        super(page);
        this.uploadBox = page.locator('.ant-upload-select input[type="file"]');
        this.apModule = page.locator('.ant-avatar').first();
        this.uploadedFileRow = (filename) => page.locator('div').filter({ hasText: filename }).nth(3);
        this.successMessage = (filename) => page.locator('body');
        this.processingTag = page.locator('table span.ant-tag-blue:has-text("Processing")').first();
    }

    async navigateToAP(){
        await this.apModule.click();
    }

    async uploadFile(filePath) {
        await this.uploadBox.setInputFiles(filePath);
    }

    async selectUploadedFile(filename) {
        await this.uploadedFileRow(filename).click();
    }

    async expectUploadSuccess(filename) {
        await expect(this.successMessage(filename)).toMatchAriaSnapshot(`\n    - img \"check-circle\"\n    - text: ${filename} file uploaded successfully\n    `);
    }

    async expectProcessingTagVisible() {
        await expect(this.processingTag).toBeVisible();
    }

}