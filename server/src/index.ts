import express from "express";
import { postRouter } from "./routes/post";
import { foodRouter } from "./routes/foodRouter";
import { pillRouter } from "./routes/pillRouter";

const app = express();

app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/food", foodRouter);
app.use("/api/pill",pillRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
