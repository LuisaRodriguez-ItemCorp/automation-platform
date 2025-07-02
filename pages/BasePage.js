export class BasePage{

    /**
     * @param {import('playwright').Page} page
     */

    constructor(page){
        this.page = page;
    }


    async login(){
        await this.navigateToItemize();
        await this.usernameBox.click();
        await this.usernameBox.fill('demo@itemizecorp.com');
        await this.passwordBox.click();
        await this.passwordBox.press('CapsLock');
        await this.passwordBox.fill('I');
        await this.passwordBox.press('CapsLock');
        await this.passwordBox.fill('Itemize123!');
        await this.submitButton.click();
    }

    async navigateToItemize(){
        await this.page.goto('https://platform.itemize.dev/home/login');
    }
}