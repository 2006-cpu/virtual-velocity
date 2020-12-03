const { client } = require("./index");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ 
    username, 
    password, 
    firstName, 
    lastName, 
    email 
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, "firstName", "lastName", email)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `,
      [username, hashedPassword, firstName, lastName, email]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function setUserAsAdmin(id){
    console.log(`Setting user with id: ${id} as an admin`);
    try {
    await client.query(`
        UPDATE users
        SET "isAdmin" = true
        WHERE id = $1;
    `, [id]);
    } catch (error) {
        console.error('Unable to set admin');
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
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  setUserAsAdmin
};
