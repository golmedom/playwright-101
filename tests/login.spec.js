import { test, expect } from "@playwright/test";
import { getCredentials } from "./data/login";

// reusable helper so I don't have the ugly loop in the Test all attempts, and I can re-use it the prev tests
async function login(page, creds, attempts = 1) {
  for (let i = 0; i < attempts; i++) {
    await page
      .getByRole("textbox", { name: "Type your username" })
      .fill(creds.username);
    await page
      .getByRole("textbox", { name: "Type your password" })
      .fill(creds.password);
    await page.getByRole("button", { name: "Login" }).click();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("Login successfully", async ({ page }) => {
  const creds = getCredentials("valid");
  await login(page, creds);
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Blocked account", async ({ page }) => {
  const creds = getCredentials("blocked");
  await login(page, creds);
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Invalid user (User not found!)", async ({ page }) => {
  const creds = getCredentials("notFound");
  await login(page, creds);
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Wrong password", async ({ page }) => {
  const creds = getCredentials("wrongPassword");
  await login(page, creds);
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Wrong password 3 times (temporary block)", async ({ page }) => {
  const creds = getCredentials("tempBlocked");
  await login(page, creds, 3);
  await expect(page.getByText(creds.message)).toBeVisible();
});

test("Test all", async ({ page }) => {
  const cases = [
    "valid",
    "blocked",
    "notFound",
    "wrongPassword",
    "tempBlocked",
  ];

  for (const key of cases) {
    const creds = getCredentials(key);

    const repeatAttempts = key === "tempBlocked" ? 3 : 1;
    await login(page, creds, repeatAttempts);

    await expect(page.getByText(creds.message)).toBeVisible();
    await page.reload(); // clean state between cycles
  }
});
