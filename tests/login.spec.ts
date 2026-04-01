import { test, expect } from "@fixtures/testFixture";
import loginData from "@data/loginData.json";

test("login page loads with expected UI elements", async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.forgotPasswordLink).toBeVisible();
});

test("valid login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(loginPage.dashboardHeader).toBeVisible();
  await expect(loginPage.page).toHaveURL(/\/web\/index\.php\/dashboard/);
});

test("invalid login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password
  );

  await expect(loginPage.errorMessage).toContainText("Invalid credentials");
});

test("invalid username with valid password shows error", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    loginData.invalidUsername.username,
    loginData.invalidUsername.password
  );

  await expect(loginPage.errorMessage).toContainText("Invalid credentials");
});

test("shows required messages when submitting empty form", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.clickLogin();

  await expect(loginPage.requiredFieldMessages).toHaveCount(2);
});

test("shows password required message when only username is submitted", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.usernameInput.fill(loginData.validUser.username);
  await loginPage.clickLogin();

  await expect(loginPage.requiredFieldMessages).toHaveCount(1);
  await expect(loginPage.requiredFieldMessages.first()).toHaveText("Required");
});

test("shows username required message when only password is submitted", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.passwordInput.fill(loginData.validUser.password);
  await loginPage.clickLogin();

  await expect(loginPage.requiredFieldMessages).toHaveCount(1);
  await expect(loginPage.requiredFieldMessages.first()).toHaveText("Required");
});

test("navigates to reset password page from forgot password link", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.forgotPasswordLink.click();

  await expect(loginPage.resetPasswordHeader).toBeVisible();
  await expect(loginPage.page).toHaveURL(/requestPasswordResetCode/);
});
