// @ts-check
import { test, expect } from "@playwright/test";

test("Menu HOME validation", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playground page/);

  await page.getByRole("link", { name: "LOGIN" }).click();
  // await page.getByRole("link", { name: "FORM" }).click();
  // await page.getByRole("link", { name: "TABLE" }).click();
  // await page.getByRole("link", { name: "TASKS" }).click();
  // await page.getByRole("link", { name: "STORE" }).click();
  // await page.getByRole("link", { name: "ABOUT" }).click();

  await expect(page.getByRole("heading", { name: "LOGIN" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "LOGIN" })).toHaveText(
    /Login/
  );
});
