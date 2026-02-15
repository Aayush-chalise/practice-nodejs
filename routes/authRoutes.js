import express from "express";
import { createTable } from "../src/createTable.js";
import client from "../src/pgConfigure.js";
import bcrypt from "bcrypt";

const router = express.Router();
createTable();
router.post("/register", async (req, res) => {
  console.log("hello from register");

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const result = await client.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING * `,

    [username, email, hashedpassword],
  );

  const user = result.rows[0];
  console.log(user);
  res.send({ message: "User created successfully", user });
});

export default router;
