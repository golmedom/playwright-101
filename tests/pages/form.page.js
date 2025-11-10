export class FormPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole("heading", { name: "Form" });
    this.nameInput = page.getByRole("textbox", { name: "Name *" });
    this.emailInput = page.getByRole("textbox", { name: "Email *" });
    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.countrySelect = page.getByLabel("Country *");
    this.genderRadio = (value) =>
      page.locator(`input[name="gender"][value="${value}"]`);
    this.genderGroup = page.locator("#genderGroup");
    this.sendButton = page.getByRole("button", { name: "Send" });
    this.successTitle = page.getByText("Success!");
    this.successBody = page.getByText("The form has been submitted");
  }

  async navigateToForm() {
    await this.page.goto("/form");
  }

  async fillName(username) {
    await this.nameInput.fill(username);
  }

  async selectHobbies(userHobbies) {
    for (const hobby of userHobbies) {
      await this.page.getByRole("checkbox", { name: hobby }).check();
    }
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async selectCountry(country) {
    await this.countrySelect.selectOption(country);
  }

  async selectGender(gender) {
    await this.genderRadio(gender).check();
  }

  async selectHobbies(userHobbies) {
    for (const hobby of userHobbies) {
      await this.page.getByRole("checkbox", { name: hobby }).check();
    }
  }

  async submitForm() {
    await this.sendButton.click();
  }

  async assertSuccess() {
    await this.successTitle.waitFor();
    await this.successBody.waitFor();
  }
}
