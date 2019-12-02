const express = require('express');
const cartRoutes = express.Router();

cartRoutes.get('/', (request, response) => {
  response.send('It works');
});

const cart = [
  { id: 0, product: 'watch', price: 200, quantity: 1 },
  { id: 1, product: 'shirt', price: 25, quantity: 2 },
  { id: 2, product: 'pants', price: 30, quantity: 2 },
  { id: 3, product: 'tie', price: 15, quantity: 4 },
  { id: 4, product: 'dress shoes', price: 75, quantity: 2 }
];

let nextItem = cart.length;

cartRoutes.get('/cart-items', (request, response) => {
  response.json(cart);
});

cartRoutes.get('/cart-items/:id', (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);

  let foundItem = cart.find(oneItem => oneItem.id === id);
  if (foundItem) {
    response.json(foundItem);
  } else {
    response.status(404); //Not found
    response.send("Couldn't find any items");
  }
});

cartRoutes.put('/cart-items/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const item = request.body;
  item.id = id;
  // Find Index by ID
  const index = cart.findIndex(i => i.id === id);
  // Replace at index
  cart.splice(index, 1, item);
  response.json(item);
});

cartRoutes.delete('/cart-items/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const index = cart.findIndex(i => i.id === id);
  // If found
  if (index !== -1) {
    cart.splice(index, 1);
  }
  // Set response code to 204. Send no content.
  response.sendStatus(204);
});

cartRoutes.post('/cart-items', (request, response) => {
  const item = request.body;
  item.id = nextItem;
  nextItem++;
  cart.push(item);

  response.json(item);
});

module.exports = cartRoutes;
