import client from "./pgConfigure";

async function createTable() {
  client.query(`CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL ,
  email VARCHAR(100) NOT NULL UNIQUE,
  password  VARCHAR(200) NOT NULL,

);`);
}
