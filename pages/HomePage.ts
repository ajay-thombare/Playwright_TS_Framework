import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly sidebarMenu: Locator;
  readonly sidebarMenuItems: Locator;
  readonly userMenuButton: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    this.sidebarMenu = page.locator("aside.oxd-sidepanel");
    this.sidebarMenuItems = page.locator("aside.oxd-sidepanel .oxd-main-menu-item");
    this.userMenuButton = page.locator(".oxd-userdropdown-tab");
    this.logoutOption = page.getByRole("menuitem", { name: "Logout" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/web/index.php/dashboard/index", {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });
    await this.dashboardHeader.waitFor({ state: "visible", timeout: 60_000 });
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
    await this.logoutOption.waitFor({ state: "visible", timeout: 10_000 });
  }
}
