import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PreferencesPage extends BasePage {
    public readonly preferencesHeading: Locator = this.page.locator("#firstHeading");
    public readonly userProfileTab: Locator = this.page.getByRole("tab").first();
    private readonly interfaceLanguageDropdown: Locator = this.page.locator("#v-2");
    private readonly saveButton: Locator = this.page.locator("[type='submit']");
    public readonly pageLanguage: Locator = this.page.locator("html");

    async navigate() {
        await super.navigate('/wiki/Special:Preferences');
    }

    async openUserProfileTab() {
        if (await this.userProfileTab.getAttribute('aria-selected') === 'false') {
            await this.userProfileTab.click();
            await expect(this.userProfileTab).toHaveAttribute('aria-selected', 'true');
        }
    }

    async scrollToInterfaceLanguageDropdown() {
        await this.interfaceLanguageDropdown.scrollIntoViewIfNeeded();
    }

    async selectInterfaceLanguage(languageCode: string) {
        await this.interfaceLanguageDropdown.click();
        await this.page.getByRole('option', { name: new RegExp(`^${languageCode} ·`) }).click();
    }

    async savePreferences() {
        await this.saveButton.click();
    }

    async switchToEnglish(lang: string) {
        await this.navigate();
        await this.openUserProfileTab();
        await this.scrollToInterfaceLanguageDropdown();
        await this.selectInterfaceLanguage(lang);
        await this.savePreferences();
    }
}