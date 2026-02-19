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

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const result = await client.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING * `,

      [username, email, hashedpassword],
    );

    const user = result.rows[0];

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });

    res.send({ message: "User created successfully", user });
  } catch (err) {
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const result = await client.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    res.sendStatus(503);
  }
});

export default router;
