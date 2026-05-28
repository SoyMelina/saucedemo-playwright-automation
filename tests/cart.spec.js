const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { users } = require('../data/users');

test('@cart Test 9: Agregar producto al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();

  await expect(productsPage.shoppingCartBadge).toHaveText('1');
});

test('@cart Test 10: Validación de producto agregado al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();

  await expect(cartPage.cartItemName).toHaveText('Sauce Labs Backpack');
});

test('@cart Test 11: Navegación al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.goToCart();

  await expect(cartPage.cartTitle).toHaveText('Your Cart');
});

test('@cart Test 12: Eliminación de producto del carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addBackpackToCart();
  await productsPage.goToCart();

  await cartPage.removeButton.click();

  await expect(cartPage.cartItems).toHaveCount(0);
});

test('@cart Test 13: Validación de carrito vacío', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.goToCart();

  await expect(cartPage.cartItems).toHaveCount(0);
});