const { test, expect, beforeEach, describe } = require("@playwright/test");
const helper = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/testing/reset");
    await helper.createUser(request, "User", "user", "12345");
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

      describe("After creating a new blog", () => {
        beforeEach(async ({ page }) => {
          await helper.createBlog(
            page,
            "test title",
            "test author",
            "test url",
          );
        });

        test("new blog can be liked", async ({ page }) => {
          await page.getByRole("button", { name: "show" }).click();
          await page.getByRole("button", { name: "like" }).click();
          await expect(page.getByText("likes 1")).toBeVisible();
        });

        test("new blog can be deleted", async ({ page }) => {
          await page.getByRole("button", { name: "show" }).click();
          page.on("dialog", (dialog) => dialog.accept());
          await page.getByRole("button", { name: "delete" }).click();
          await expect(page.getByText("delete")).not.toBeVisible();
        });

        test("only the user who added blog see blog's delete button", async ({
          page,
          request,
        }) => {
          await page.getByRole("button", { name: "show" }).click();
          await expect(page.getByText("delete")).toBeVisible();
          await page.getByRole("button", { name: "logout" }).click();
          await helper.createUser(request, "User2", "user2", "12345");
          await helper.login(page, "user2", "12345");
          await expect(page.getByText("user2 logged in")).toBeVisible();
          await page.getByRole("button", { name: "show" }).click();
          await expect(page.getByText("delete")).not.toBeVisible();
        });
      });
    });
  });
});
