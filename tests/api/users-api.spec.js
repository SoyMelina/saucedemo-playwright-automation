const { test, expect } = require('@playwright/test');
const { posts } = require('../../data/apiData');

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
    data: posts.validPost,
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.title).toBe(posts.validPost.title);
  expect(body.body).toBe(posts.validPost.body);
  expect(body.userId).toBe(posts.validPost.userId);
});

test('@api Test API 4: Modificar post existente', async ({ request }) => {
  const response = await request.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
     data: posts.updatedPost,
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.title).toBe(posts.updatedPost.title);
  expect(body.body).toBe(posts.updatedPost.body);
});

test('@api Test API 5: Eliminar post', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);
});

test('@api Test API 6: Validar endpoint inexistente', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/999999'
  );

  expect(response.status()).toBe(404);
});

test('@api Test API 7: Validar Content-Type', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  const contentType = response.headers()['content-type'];

  expect(contentType).toContain('application/json');
});

test('@api Test API 8: Validar estructura de respuesta', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  const body = await response.json();

  expect(body).toHaveProperty('userId');
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
});

test('@api Test API 9: Validar tiempo de respuesta', async ({ request }) => {
  const startTime = Date.now();

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  const responseTime = Date.now() - startTime;

  expect(response.status()).toBe(200);

  expect(responseTime).toBeLessThan(3000);

  console.log(`Tiempo de respuesta: ${responseTime} ms`);
});