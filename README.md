# SauceDemo Automation Project

## CI/CD Automation
Proyecto configurado con GitHub Actions para ejecución automática de pruebas Playwright.

---

Proyecto de automatización QA realizado con Playwright y JavaScript utilizando la aplicación SauceDemo.

## Tecnologías utilizadas

- Playwright
- JavaScript
- Node.js
- Visual Studio Code

## Estructura del proyecto

```bash
pages/
tests/
data/
```

## Funcionalidades automatizadas

### Login
- Login válido
- Login inválido
- Validación de mensajes de error

### Products
- Navegación a Products
- Validación de productos
- Ordenamiento de productos

### Cart
- Agregar productos
- Eliminar productos
- Validación de carrito

### Checkout
- Flujo de checkout
- Validaciones de campos
- Compra end-to-end

## Ejecución de pruebas

Ejecutar todos los tests:

```bash
npx playwright test
```

Ejecutar tests de login:

```bash
npx playwright test --grep @login
```

Ejecutar tests de productos:

```bash
npx playwright test --grep @products
```

Ejecutar tests de carrito:

```bash
npx playwright test --grep @cart
```

Ejecutar tests de checkout:

```bash
npx playwright test --grep @checkout
```

## Reportes

## Evidencia de ejecución

### Playwright HTML Report

![Playwright Report](docs/screenshots/playwright-report.png)

Generar reporte HTML:

```bash
npx playwright show-report
```