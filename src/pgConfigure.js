import pkg from "pg";
import dotenv from "dotenv";
const { Client } = pkg;

dotenv.config();
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client
  .connect()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log("Connection error:", err));

export default client;
