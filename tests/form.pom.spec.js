import { test } from "@playwright/test";
import { FormPage } from "./pages/form.page";
import { USERS } from "./data/form";

test.beforeEach(async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.navigateToForm();
});

test.describe("Form submission tests", () => {
  for (const user of USERS) {
    test(`Submit form scenario: ${user.scenario}`, async ({ page }) => {
      const form = new FormPage(page);

      // Fill fields
      await form.fillName(user.name);
      await form.fillEmail(user.email);
      await form.fillPassword(user.password);
      await form.selectCountry(user.countryValue);
      await form.selectGender(user.genderValue);

      // Hobbies (your FormPage handles unchecking + selecting)
      await form.selectHobbies(user.hobbies);

      // Submit
      await form.submitForm();

      // Assertions
      await expect(page).toHaveURL(/submitted/i);
      await expect(form.successTitle).toBeVisible();
      await expect(form.successBody).toBeVisible();
    });
  }

  test("should show validation errors when submitting empty form", async ({
    page,
  }) => {
    const form = new FormPage(page);

    await form.submitForm();

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
