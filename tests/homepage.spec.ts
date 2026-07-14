import { test, expect } from "@fixtures/testFixture";
import { HomePage } from "@pages/HomePage";
import loginData from "@data/loginData.json";

test.describe("Homepage after login", () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password,
    );

    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard/);
  });

  test("dashboard header is visible after login", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.dashboardHeader).toBeVisible();
  });

  test("homepage shows main navigation after login", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.sidebarMenu).toBeVisible();
  });

  test("sidebar menu shows all expected options", async ({ page }) => {
    const homePage = new HomePage(page);
    const expectedOptions = [
      "Admin",
      "PIM",
      "Leave",
      "Time",
      "Recruitment",
      "My Info",
      "Performance",
      "Dashboard",
      "Directory",
      "Maintenance",
      "Claim",
      "Buzz"
    ];

    for (const option of expectedOptions) {
      await expect(homePage.sidebarMenu).toContainText(option);
    }
  });

  test("user menu trigger is available from the homepage", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.userMenuButton).toBeVisible();
  });
});
