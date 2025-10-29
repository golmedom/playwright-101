// @ts-check
import { test, expect } from "@playwright/test";
import { getCredentials } from "./data/login";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("Login successfully", async ({ page }) => {
  const creds = getCredentials("valid");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(creds.username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(creds.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Blocked account", async ({ page }) => {
  const creds = getCredentials("blocked");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(creds.username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(creds.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Invalid user (User not found!)", async ({ page }) => {
  const creds = getCredentials("notFound");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(creds.username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(creds.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Wrong password", async ({ page }) => {
  const creds = getCredentials("wrongPassword");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(creds.username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(creds.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Wrong password 3 times (temporary block)", async ({ page }) => {
  const creds = getCredentials("tempBlocked");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(creds.username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(creds.password);
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password12345");
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password12346");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User temporarily blocked!")).toBeVisible();
});
