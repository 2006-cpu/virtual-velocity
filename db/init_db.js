const { client } = require("./index");
const {
  createProduct,
  createOrder,
  createUser,
  createOrderProduct,
} = require("./utils");

async function buildTables() {
  try {
    client.connect();

    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "imageURL" TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN NOT NULL DEFAULT false
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT 'created',
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" DATE DEFAULT CURRENT_DATE
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(18, 2) NOT NULL,
      "imageURL" TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category VARCHAR(255) NOT NULL
    );
    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0
    );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("starting to create initial product!");

    const productsToCreate = [
      {
        id: 1,
        name: "PSA grade 10 Base set Charzard",
        description: "(dummy description)",
        price: 3999.95,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 2,
        name: "PSA grade 10 Base set Blastoise",
        description: "(dummy description)",
        price: 3499.95,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 3,
        name: "PSA grade 10 Base set Venusaur",
        description: "(dummy description)",
        price: 3399.95,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 4,
        name: "PSA grade 10 Base set Mew",
        description: "(dummy description)",
        price: 2999.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 5,
        name: "PSA grade 10 Base set MewTwo",
        description: "(dummy description)",
        price: 2999.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 6,
        name: "Pokemon Jungle 1st Edition Box(Sealed)",
        description: "(dummy description)",
        price: 24000.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 7,
        name: "Pokemon Fossil 1st Edition Box(Sealed)",
        description: "(dummy description)",
        price: 18000.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 8,
        name: "Pokemon Base Set 1st Edition Box(Sealed)",
        description: "(dummy description)",
        price: 40000.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
      {
        id: 9,
        name: "Pokemon Mystery Box",
        description: "(dummy description)",
        price: 45.99,
        imageURL: "",
        inStock: true,
        category: "Pokemon Cards",
      },
    ];
    const products = await Promise.all(
      productsToCreate.map((product) => createProduct(product))
    );
    console.log("products created: ", products);

    // ---------

    const usersToCreate = [
      {
        firstName: "elmar",
        lastName: "fudd",
        email: "elmarisawesome@me.com",
        imageURL: "",
        username: "elmarisme",
        password: "elmar12345",
        isAdmin: "false",
      },

      {
        firstName: "dougy",
        lastName: "fresh",
        email: "dougIstheman@me.com",
        imageURL:
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        username: "dougIsMe",
        password: "dougy12345",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(
      usersToCreate.map((user) => createUser(user))
    );
    console.log("users created:", users);

    // ------

    const ordersToCreate = [
      {
        status: "created",
        userId: 1,
      },
      {
        status: "created",
        userId: 1,
      },
    ];
    const orders = await Promise.all(
      ordersToCreate.map((order) => createOrder(order))
    );
    console.log("order created:", orders);

    // -----------

    //correct syntax to create order_products?
    const orderProductsToCreate = [
      {
        productId: 1,
        orderId: 1,
        price: 5000,
        quantity: 1,
      },
      {
        productId: 2,
        orderId: 1,
        price: 5001,
        quantity: 1,
      },
      {
        productId: 3,
        orderId: 1,
        price: 5002,
        quantity: 1,
      },
    ];
    const order_product = await Promise.all(
      orderProductsToCreate.map((order_product) =>
        createOrderProduct(order_product)
      )
    );
    console.log("order_product created:", order_product);

    // -----------
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
