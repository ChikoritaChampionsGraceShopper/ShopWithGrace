'use strict';
const teas = require('./ProductSeedData');
const usernames = require('./UserSeedData');
const carts = require('./OrderDetailsSeedData');
const {
  db,
  models: { User, Product, Order_Details, Order },
} = require('../server/db');

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
  const [dummyProduct] = await Promise.all([
    Product.create({
      name: 'Dummy Tea',
      image:
        'https://www.teasandthes.com/images/product//b/i/bitan_piaoxue_200.jpg',
      category: 'Green',
      price: 10,
      favorite: '0',
      status: 'in stock',
      inventory: 25,
      origin: 'China',
      description: 'Hello I am the dummy data',
    }),
  ]);

  const [harrison] = await Promise.all([
    User.create({
      username: 'Harrison',
      password: 'secure',
      full_name: 'Harrison Lynch',
      email: 'hblynch2001@gmail.com',
      street_address: '1 Hogwarts Path',
      city: 'Hogwarts',
      state: 'Wizarding World',
      zip_code: '00000',
      isAdmin: true,
    }),
  ]);
  const makeOrders = await User.findAll();
  const newOrders = await makeOrders.map((user) => {
    user.createOrder();
  });
  // const allOrders = await Order.findAll()
  // const makeOrderDetails = await allOrders.map(order => {
  //   order.setProduct({quantity: 2, price: 20, productId: 122})
  // })
  // const allProducts = await Product.findAll()
  // const newProductOrders = await allProducts.map(product => {
  //   product.addOrder(25)
  // })
  await dummyProduct.addOrder(25, { quantity: 1, price: 10 });
  // const foundOrder = await Order.findOne({ where: { userId: 25 } });
  // await foundOrder.addOrder_Details(1);

  // console.log(User.prototype) //connected to Orders
  // console.log(Order.prototype) //connected to Order_Details
  // console.log(Product.prototype) //connected to Order_Details
  // console.log(Order_Details.prototype) //connected-Orders&Product

  console.log(`seeded ${usernames.length} users`);
  console.log(`seeded ${teas.length} teas`);
  console.log(`seeded successfully`);
  return {
    harrison,
    products,
    users,
    newOrders,
    // newProductOrders
    // makeOrderDetails
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
