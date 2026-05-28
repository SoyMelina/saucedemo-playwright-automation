const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../data/users');

test('@login Test 1: Login válido con usuario standard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory.html/);
});

test('@login Test 2: Login inválido con usuario incorrecto', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.invalid.username,
    users.invalid.password
  );

  await expect(loginPage.errorMessage).toBeVisible();
});

test('@login Test 3: Validar mensaje de error en login inválido', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.locked.username,
    users.locked.password
  );

  await expect(loginPage.errorMessage).toContainText(
    'Sorry, this user has been locked out'
  );
});