import express from "express";
import { createTable } from "../src/createTable";
import client from "../src/pgConfigure.js";

const router = express.Router();

router.post("/register", (req, res) => {
  createTable();
  const { username, email, password } = req.body;
});
