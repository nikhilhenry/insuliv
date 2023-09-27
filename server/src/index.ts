import express from "express";

import "dotenv/config";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("REST API server ready at: http://localhost:3000 ⚡⚡")
);
