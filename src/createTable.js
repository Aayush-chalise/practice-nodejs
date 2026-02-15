import client from "./pgConfigure.js";

export async function createTable() {
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL ,
  email VARCHAR(100) NOT NULL UNIQUE,
  password  VARCHAR(200) NOT NULL

);`);

    await client.query(`CREATE TABLE IF NOT EXISTS products(
   id SERIAL PRIMARY KEY,
   productname VARCHAR(50) NOT NULL UNIQUE ,
   description TEXT NOT NULL ,
    price NUMERIC (10,2),
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE 
  )`);
  } catch (err) {
    console.log("error creating database:", err);
  }
}
