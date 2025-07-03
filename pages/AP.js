import { BasePage } from "./BasePage.js";

export class AP extends BasePage{

    constructor(page){
        super(page);
        this.uploadBox = page.locator('.ant-upload-select input[type="file"]');
        this.apModule = page.locator('.ant-avatar').first();
    }

    async navigateToAP(){
        await this.apModule.click();
    }


}