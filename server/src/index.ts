import express from "express";

import "dotenv/config";
import { imageRouter } from "./routes/imageRouter";
import { postRouter } from "./routes/post";
import { activityRouter } from "./routes/acitivityRouter";
import { metaRouter } from "./routes/metaRouter";

const app = express();

app.use(express.json());
app.use("/api/image", imageRouter);
app.use("/api/post", postRouter);
app.use("/api/activity", activityRouter);
app.use("/api/meta", metaRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
