exports.CheckoutPage = class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.checkoutButton = page.locator('[data-test="checkout"]');

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');

        this.checkoutTitle = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async completeInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishPurchase() {
        await this.finishButton.click();
    }
};