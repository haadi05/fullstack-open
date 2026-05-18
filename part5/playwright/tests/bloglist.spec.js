const { test, expect, beforeEach, describe } = require("@playwright/test");
const helper = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/testing/reset");
    await helper.createUser(request, "User", "user", "12345");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Log in to application" }),
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await helper.login(page, "user", "12345");
      await page.waitForURL("/");
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await helper.login(page, "user", "wrong");

      const errorDiv = page.locator(".errorMsg");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(
        page.getByRole("heading", { name: "blogs" }),
      ).not.toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await helper.login(page, "user", "12345");
        await page.waitForURL("/");
      });

      test("a new blog can be created", async ({ page }) => {
        await helper.createBlog(page, "test blog", "test author", "test url");
        await expect(
          page.getByRole("link", { name: "test blog by test author" }),
        ).toBeVisible();
      });

      test("new blog can be liked", async ({ page }) => {
        await helper.createBlog(page, "test blog", "test author", "test url");
        await page
          .getByRole("link", { name: "test blog by test author" })
          .click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("new blog can be deleted", async ({ page }) => {
        await helper.createBlog(page, "test blog", "test author", "test url");
        await page
          .getByRole("link", { name: "test blog by test author" })
          .click();
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();
        await expect(
          page.getByRole("link", { name: "test blog by test author" }),
        ).not.toBeVisible();
      });
    });
  });
});
