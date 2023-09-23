import { Router } from "express";
import multer from "multer";

export const imageRouter = Router();
const upload = multer({ dest: "uploads/" });

imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  console.log(file);
  return res.status(200).send("OK");
});
