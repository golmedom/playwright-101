import { test, expect } from "@playwright/test";
import { USERS } from "./data/form";

test.beforeEach(async ({ page }) => {
  await page.goto("/form");
});

test.describe("Form submission tests", () => {
  for (const user of USERS) {
    test(`Submit form scenario: ${user.scenario}`, async ({ page }) => {
      await page.fill("#name", user.name);
      await page.fill("#email", user.email);
      await page.fill("#password", user.password);

      await page.selectOption("#country", user.countryValue);

      // await page.getByRole("radio", { name: user.gender }).check();
      // The reason is because name is not input name and it's actually search by text and part of the test match with two options.
      /*
       * @ form.spec.js:20 Error: locator.check: Error: strict mode violation: getByRole('radio', { name: 'Male' }) resolved to 2 elements: 1) <input type="radio" value="male" name="gender" class="form-radio"/> aka getByRole('radio', { name: 'Male', exact: true }) 2) <input type="radio" name="gender" value="female" class="form-radio"/> aka getByRole('radio', { name: 'Female' }) Call log: - waiting for getByRole('radio', { name: 'Male' })
       */

      await page
        .locator(`input[type="radio"][value="${user.genderValue}"]`) // I had to do it with this locator otherwise fails, this works like css
        .check();

      const allHobbyBoxes = page.locator(
        '#hobbiesGroup input[type="checkbox"]'
      );

      const count = await allHobbyBoxes.count();
      for (let i = 0; i < count; i++) {
        const box = allHobbyBoxes.nth(i); // this works like css
        if (await box.isChecked()) await box.uncheck();
      }

      for (const hobby of user.hobbies) {
        await page.getByRole("checkbox", { name: hobby }).check();
      }

      await page.click("#submitBtn");

      await expect(page).toHaveURL(/submitted/i);
      await expect(page.getByText("Success!")).toBeVisible();
      await expect(page.getByText("The form has been submitted")).toBeVisible();
    });
  }

  test("should show validation errors when submitting empty form", async ({
    page,
  }) => {
    await page.click("#submitBtn");

    await expect(page.getByText("The name field is required.")).toBeVisible();
    await expect(page.getByText("The email field is required.")).toBeVisible();
    await expect(
      page.getByText("The password field is required.")
    ).toBeVisible();
    await expect(
      page.getByText("The country field is required.")
    ).toBeVisible();
    await expect(page.getByText("The gender field is required.")).toBeVisible();
  });
});
