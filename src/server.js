import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/about", (req, res) => {
  res.send("<h1>Hello I am aayush</h2>");
});

app.listen(PORT, () => {
  console.log("server is live on port :", PORT);
});
