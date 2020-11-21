const { client } = require("./index");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ username, password, firstName, lastName, email, imageURL, isAdmin }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, "firstName", "lastName", email, "imageURL", "isAdmin")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `,
      [username, hashedPassword, firstName, lastName, email, imageURL, isAdmin]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * FROM users
          WHERE username = $1;
          `,
      [username]
    );

    const isAMatch = await bcrypt.compare(password, user.password);

    if (isAMatch) {
      console.log("isAMatch: ", isAMatch);
      delete user.password;
      return user;
    } else {
      console.log("incorrect password");
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(
      `
          SELECT *
          FROM users
          `
    );

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id = $1
      `,
      [id]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username = $1
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
