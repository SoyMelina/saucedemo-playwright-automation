exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;

        this.cartTitle = page.locator('.title');

        this.cartItems = page.locator('.cart_item');

        this.cartItemName = page.locator('.inventory_item_name');

        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }
};