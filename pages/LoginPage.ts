import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginHeader: Locator;
  readonly companyBrandingLogo: Locator;
  readonly errorMessage: Locator;
  readonly requiredFieldMessages: Locator;
  readonly forgotPasswordLink: Locator;
  readonly resetPasswordHeader: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[name='username']");
    this.passwordInput = page.locator("input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
    this.loginHeader = page.getByRole("heading", { name: "Login" });
    this.companyBrandingLogo = page.getByRole("img", { name: "company-branding" });
    this.errorMessage = page.locator("p.oxd-alert-content-text");
    this.requiredFieldMessages = page.locator("span.oxd-input-field-error-message");
    this.forgotPasswordLink = page.getByText(/forgot\s+your\s+password\?/i);
    this.resetPasswordHeader = page.getByRole("heading", { name: "Reset Password" });
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/web/index.php/auth/login", {
      waitUntil: "domcontentloaded"
    });
    await this.usernameInput.waitFor({ state: "visible", timeout: 30_000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async goToResetPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }
}
