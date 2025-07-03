import { BasePage } from "./BasePage.js";

export class Settings extends BasePage{

    constructor(page){
        super(page);
        this.settingsModule = page.locator('div:nth-child(8) > div > .ant-avatar');
        this.fieldManagementMenu = page.getByRole('menuitem', { name: 'layout Field Management' });
    }

    async navigateToSettings(){
        await this.settingsModule.click();
    }


}