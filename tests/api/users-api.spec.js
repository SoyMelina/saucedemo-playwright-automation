const { test, expect } = require('@playwright/test');

test('@api Test API 1: Obtener listado de posts', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('title');
});

test('@api Test API 2: Obtener post por ID', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBeTruthy();
});

test('@api Test API 3: Crear post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Proyecto QA Automation',
      body: 'Prueba de creación de recurso vía API',
      userId: 1,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.title).toBe('Proyecto QA Automation');
  expect(body.body).toBe('Prueba de creación de recurso vía API');
  expect(body.userId).toBe(1);
});

test('@api Test API 4: Modificar post existente', async ({ request }) => {
  const response = await request.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      data: {
        id: 1,
        title: 'Post actualizado',
        body: 'Contenido actualizado',
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.title).toBe('Post actualizado');
  expect(body.body).toBe('Contenido actualizado');
});

test('@api Test API 5: Eliminar post', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);
});