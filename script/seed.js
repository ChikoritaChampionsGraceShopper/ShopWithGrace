
'use strict'
const teas = require('./ProductSeedData')
const usernames = require('./UserSeedData')
const carts = require('./CartSeedData')
const {db, models: {User, Product, Cart, Order} } = require('../server/db')

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

  const [harrison] = await Promise.all([
    User.create({
      username: 'Harrison',
      password: 'secure',
      full_name: 'Harrison Lynch',
      email: 'hblynch2001@gmail.com',
      street_address: '1 Hogwarts Path',
      city: 'Hogwarts',
      state: 'Wizarding World',
      zip_code: '00000'
    })
  ])
  const makeUserOrders = await User.findAll()
  const newUserOrders = makeUserOrders.map(user => {
    user.createOrder()
  })

<<<<<<< HEAD
  function getRandom(max) {
    return Math.floor(Math.random() * max)
  }

  const productOrders = await Product.findAll()
  const matchProductOrders = productOrders.map(product => {
    const productID = getRandom(productOrders.length)
    const userID = getRandom(newUserOrders.length)
    const userOrder = newUserOrders[userID]
    product.addOrder(productID)
  })

  console.log(Order.prototype)
  console.log(`seeded ${matchProductOrders.length} carts`)
  console.log(`seeded ${newUserOrders.length} orders`)
  console.log(`seeded ${usernames.length} users`)
  console.log(`seeded ${teas.length} teas`)
  console.log(`seeded successfully`)
=======
  console.log(`seeded ${usernames.length} users`);
  console.log(`seeded ${teas.length} teas`);
  console.log(`seeded successfully`);
>>>>>>> 6fe1dac1d43ec057384f138776665dfb4f41d015
  return {
    harrison,
    products,
    users,
    newUserOrders,
    matchProductOrders
    // cartItems
  }
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
