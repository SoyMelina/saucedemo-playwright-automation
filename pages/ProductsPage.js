exports.ProductsPage = class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.firstProductName = page.locator('.inventory_item_name').first();
        this.productNames = page.locator('.inventory_item_name');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.inventoryPrices = page.locator('.inventory_item_price');

        this.addBackpackButton = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        this.removeBackpackButton = page.locator(
            '[data-test="remove-sauce-labs-backpack"]'
        );

        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async sortLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

    async sortHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    async sortAToZ() {
        await this.sortDropdown.selectOption('az');
    }

    async sortZToA() {
        await this.sortDropdown.selectOption('za');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }

    async addBackpackToCart() {
        await this.addBackpackButton.click();
    }

    async removeBackpackFromCart() {
        await this.removeBackpackButton.click();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
};