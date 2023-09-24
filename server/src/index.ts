import express from "express";
import { postRouter } from "./routes/post";
import { imageRouter } from "./routes/image";
import { activityRouter } from "./routes/activity";

import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/image", imageRouter);
app.use("/api/activities", activityRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
