import { test, expect } from "../utils/fixtures/pageFixtures";

test.describe('Wikipedia: interface language', () => {

    test('Authorized user can change the interface language', async ({ app }) => {
        // Open Wiki
        await app.homePage.navigate();
        await expect(app.homePage.wikiLogo).toBeVisible();

        // Do log in process
        await app.homePage.openLoginPage();
        await expect(app.loginPage.loginHeading).toBeVisible();
        await app.loginPage.login(
            process.env.WIKI_USERNAME!, 
            process.env.WIKI_PASSWORD!
        );
        await expect(app.homePage.userValue).toBeVisible();

        // Go to Preferences
        await app.homePage.openPreferencesPage();
        await expect(app.preferencesPage.preferencesHeading).toBeVisible();

        // Go to User profile, Internationalisation section
        await app.preferencesPage.openUserProfileTab();
        await app.preferencesPage.scrollToInterfaceLanguageDropdown();

        // Choose Italian language
        await app.preferencesPage.selectInterfaceLanguage('it');

        // Click on "Save" button
        await app.preferencesPage.savePreferences();

        // Expect the page to be translated into Italian language
        await expect(app.preferencesPage.pageLanguage).toHaveAttribute("lang", "it");
        await expect(app.preferencesPage.preferencesHeading).toHaveText("Preferenze");
    });

    test.afterEach(async ({ app }) => {
        // Back to English language for cleanup
        await app.preferencesPage.switchToEnglish("en");
        await expect(app.preferencesPage.pageLanguage).toHaveAttribute("lang", "en");
        await expect(app.preferencesPage.preferencesHeading).toHaveText("Preferences");
    });

});