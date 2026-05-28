const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users } = require('../data/users');

test('@checkout Test 14: Inicio de checkout desde el carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();
  await checkoutPage.goToCheckout();

  await expect(checkoutPage.checkoutTitle).toHaveText(
    'Checkout: Your Information'
  );
});

test('@checkout Test 15: Validación de campos obligatorios en checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();
  await checkoutPage.goToCheckout();

  await checkoutPage.continueButton.click();

  await expect(checkoutPage.errorMessage).toContainText(
    'First Name is required'
  );
});

test('@checkout Test 16: Completar información de checkout correctamente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();
  await checkoutPage.goToCheckout();

  await checkoutPage.completeInformation('Melina', 'Valdez', '5000');

  await expect(checkoutPage.checkoutTitle).toHaveText(
    'Checkout: Overview'
  );
});

test('@checkout Test 17: Finalizar compra correctamente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();
  await checkoutPage.goToCheckout();

  await checkoutPage.completeInformation('Melina', 'Valdez', '5000');
  await checkoutPage.finishPurchase();

  await expect(checkoutPage.completeHeader).toHaveText(
    'Thank you for your order!'
  );
});

test('@visual Test 18: Validación visual del logo de SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  const loginLogo = page.locator('.login_logo');

  await expect(loginLogo).toBeVisible();
});

test('@logout Test 19: Logout exitoso del sistema', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.openMenu();
  await productsPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('@e2e Test 20: Flujo completo de compra end-to-end', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();

  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();

  await productsPage.goToCart();

  await checkoutPage.goToCheckout();

  await checkoutPage.completeInformation('Melina', 'Valdez', '5000');

  await checkoutPage.finishPurchase();

  await expect(checkoutPage.completeHeader).toHaveText(
    'Thank you for your order!'
  );
});