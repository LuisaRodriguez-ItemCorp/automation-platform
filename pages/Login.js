import { BasePage } from "./BasePage.js";

export class Login extends BasePage{

    constructor(page){
        super(page);
        this.usernameBox = page.getByRole('textbox', { name: '* Email' });
        this.passwordBox = page.getByRole('textbox', { name: '* Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });

    }
}