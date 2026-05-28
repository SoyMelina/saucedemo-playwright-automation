const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { users } = require('../data/users');

test('@products Test 4: Navegación a página Products', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory.html/);
});

test('@products Test 5: Validación de título de Products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(productsPage.productsTitle).toHaveText('Products');
});

test('@products Test 6: Visualización de productos', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(productsPage.inventoryItems.first()).toBeVisible();
  await expect(productsPage.inventoryItems).toHaveCount(6);
});

test('@products Test 7: Validación de producto específico Sauce Labs Backpack', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(productsPage.productNames).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]);
});

test('@products Test 8: Ordenar productos de menor a mayor precio', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.sortDropdown.selectOption('lohi');

  await expect(productsPage.firstProductName).toHaveText('Sauce Labs Onesie');
});

test('@products Test 21: Ordenar productos de Z a A', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.sortZToA();

  await expect(productsPage.firstProductName).toHaveText(
    'Test.allTheThings() T-Shirt (Red)'
  );
});

test('@products Test 22: Ordenar productos de A a Z', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.sortAToZ();

  await expect(productsPage.firstProductName).toHaveText(
    'Sauce Labs Backpack'
  );
});

test('@products Test 23: Ordenar productos de mayor a menor precio', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.sortHighToLow();

  await expect(productsPage.firstProductName).toHaveText(
    'Sauce Labs Fleece Jacket'
  );
});