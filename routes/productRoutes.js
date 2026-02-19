import express from "express";
import client from "../src/pgConfigure.js";

const router = express.Router();

// get all products for logged in user
router.get("/", async (req, res) => {
  const products = await client;
});
