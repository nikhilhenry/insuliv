import express from "express";
import { postRouter } from "./routes/post";

const app = express();

app.use(express.json());

app.use("/api/post", postRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
