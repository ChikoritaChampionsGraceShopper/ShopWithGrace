'use strict';
const teas = require('./ProductSeedData');
const usernames = require('./UserSeedData');
const orders = require('./OrderSeedData');
const carts = require('./CartSeedData');
const {
  db,
  models: { User, Product, Cart, Order },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    usernames.map((user) => {
      return User.create(user);
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    teas.map((product) => {
      return Product.create(product);
    }),
  ]);

  //Creating Orders
  const orderItems = await Promise.all([
    orders.map((order) => {
      return Order.create(order);
    }),
  ]);

  // Creating Carts
  const cartItems = await Promise.all([
    carts.map((cart) => {
      return Cart.create(cart);
    }),
  ]);

  console.log(`seeded ${usernames.length} users`);
  console.log(`seeded ${teas.length} teas`);
  console.log(`seeded successfully`);
  return {
    products,
    users,
    orderItems,
    cartItems,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    //WILL POSSIBLY NEED TO FIX THIS!!!
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
