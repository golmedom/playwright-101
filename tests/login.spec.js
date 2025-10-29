// @ts-check
import { test, expect } from "@playwright/test";

test("Login successfully", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User successfully logged in!")).toBeVisible();
});

test("Blocked account", async ({ page }) => {
  await page.goto("/login");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill("testblock");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User blocked!")).toBeVisible();
});

test("Invalid user (User not found!)", async ({ page }) => {
  await page.goto("/login");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill("test-not-found");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123-not-found");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User not found!")).toBeVisible();
});
