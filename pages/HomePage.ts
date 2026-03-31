import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/web/index.php/dashboard/index", {
      waitUntil: "domcontentloaded"
    });
  }
}
