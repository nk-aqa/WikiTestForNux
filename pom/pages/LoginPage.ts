import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    public readonly loginHeading: Locator = this.page.locator("#firstHeading", { hasText: 'Log in' });
    private readonly usernameInput: Locator = this.page.getByPlaceholder("Enter your username");
    private readonly passwordInput: Locator = this.page.getByPlaceholder("Enter your password");
    private readonly loginButton: Locator = this.page.locator("#wpLoginAttempt");
    
    async navigate() {
        await super.navigate('');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}