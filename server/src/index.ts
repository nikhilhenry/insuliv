import express from "express";

import "dotenv/config";
import { imageRouter } from "./routes/imageRouter";
import { postRouter } from "./routes/post";
import { foodRouter } from "./routes/foodRouter";
import { pillRouter } from "./routes/pillRouter";
import { activityRouter } from "./routes/activityRouter";
import { metaRouter } from "./routes/metaRouter";

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRouter);
app.use("/api/food", foodRouter);
app.use("/api/pill", pillRouter);
app.use("/api/image", imageRouter);
app.use("/api/activity", activityRouter);
app.use("/api/meta", metaRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
