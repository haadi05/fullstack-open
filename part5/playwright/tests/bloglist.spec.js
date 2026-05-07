const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "User",
        username: "user",
        password: "12345",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("login")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("textbox", { name: "username" }).fill("user");
      await page.getByRole("textbox", { name: "password" }).fill("12345");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("user logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("textbox", { name: "username" }).fill("user");
      await page.getByRole("textbox", { name: "password" }).fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      const errorDiv = page.locator(".errorMsg");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(page.getByText("user logged in")).not.toBeVisible();
    });
  });
});
