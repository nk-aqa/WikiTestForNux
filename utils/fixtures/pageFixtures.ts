import { test as base, Page } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage";
import { LoginPage } from "../../pom/pages/LoginPage";
import { PreferencesPage } from "../../pom/pages/PreferencesPage";

type App = {
    page: Page;
    homePage: HomePage;
    loginPage: LoginPage;
    preferencesPage: PreferencesPage;
}

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            homePage: new HomePage(page),
            loginPage: new LoginPage(page),
            preferencesPage: new PreferencesPage(page)
        };
        await use(app);
    }
})

export { expect } from "@playwright/test";