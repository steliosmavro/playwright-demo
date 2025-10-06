import { expect, test } from "@playwright/test";

const username = "Stelios";
const password = "123";
const successTxt = `Welcome, ${username}!`;
const missingCredTxt = "Please fill all fields.";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should login user", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("status")).toHaveText(successTxt);
  });

  test("should fail on missing credentials", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("");
    await page.getByPlaceholder("Password").fill("");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("status")).toHaveText(missingCredTxt);
  });

  test("should reset state on reload", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("status")).toHaveText(successTxt);

    await page.reload();

    await expect(page.getByRole("status")).toHaveText("");
    await expect(page.getByPlaceholder("Username")).toHaveValue("");
    await expect(page.getByPlaceholder("Password")).toHaveValue("");
  });
});
