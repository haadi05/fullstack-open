const { test, expect, beforeEach, describe } = require("@playwright/test");
const helper = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "User",
        username: "user",
        password: "12345",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("login")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await helper.login(page, "user", "12345");
      await expect(page.getByText("user logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await helper.login(page, "user", "wrong");

      const errorDiv = page.locator(".errorMsg");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(page.getByText("user logged in")).not.toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await helper.login(page, "user", "12345");
      });

      test("a new blog can be created", async ({ page }) => {
        await helper.createBlog(page, "test title", "test author", "test url");
        await expect(page.getByText("test title by test author")).toBeVisible();
      });

      test("new blog can be liked", async ({ page }) => {
        await helper.createBlog(page, "test title", "test author", "test url");
        await page.getByRole("button", { name: "show" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("blog can be deleted", async ({ page }) => {
        await helper.createBlog(page, "test title", "test author", "test url");
        await page.getByRole("button", { name: "show" }).click();
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();
        await expect(page.getByText("delete")).not.toBeVisible();
      });
    });
  });
});
