
import { AP } from "./pages/AP.js";
import { Login } from "./pages/Login.js"
import { Settings } from "./pages/Settings.js";


export let ap;
export let login;
export let settings;
export let page;

export const initElements = (argPage) => {
    page =argPage;
    login = new Login(page);
    ap = new AP(page);
    settings = new Settings(page);
}