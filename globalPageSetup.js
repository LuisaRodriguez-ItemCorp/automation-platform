
import { Login } from "./pages/Login.js"


export let ap;
export let login;
export let page;

export const initElements = (argPage) => {
    page =argPage;
    login = new Login(page);
}