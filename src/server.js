import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is live on port :", PORT);
});
