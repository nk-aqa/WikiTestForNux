import { Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    public readonly wikiLogo: Locator = this.page.getByAltText("Wikipedia");
    private readonly loginButton: Locator = this.page.locator("#pt-login-2");
    public readonly userValue: Locator = this.page.locator("#pt-userpage-2");
    private readonly userMenuButton: Locator = this.page.locator("#vector-user-links-dropdown-checkbox");
    private readonly preferencesButton: Locator = this.page.locator('#pt-preferences', { hasText: 'Preferences' });

    async navigate() {
        await super.navigate('');
    }

    async openLoginPage() {
        await this.loginButton.click();
    }

    async openPreferencesPage() {
        await this.userMenuButton.click();
        await expect(this.userMenuButton).toHaveAttribute('aria-expanded', 'true');
        await this.page.waitForTimeout(150);
        await this.preferencesButton.waitFor({ state: 'visible' });
        await this.preferencesButton.click();
    }
}