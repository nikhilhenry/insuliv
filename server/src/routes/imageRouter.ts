import { Router } from "express";
import { Deta } from "deta";
import { nanoid } from "nanoid";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const projectKey = process.env.DETA_KEY;
const deta = Deta(projectKey);
const photos = deta.Drive("food");

export const imageRouter = Router();

imageRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const img = await photos.get(id);
  if (!img) {
    return res.status(404).json({ message: "Image not found" });
  }
  res.contentType("jpeg");
  const imgData = await img.arrayBuffer();
  return res.end(Buffer.from(imgData), "binary");
});

imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileName = nanoid(4) + ".jpg";
  // load the image from the file system in the uploads folder
  const id = await photos.put(fileName, {
    data: file.buffer,
  });
  return res
    .status(200)
    .send({ img_url: `${process.env.HOST_NAME}/api/image/` + id });
});

imageRouter.post("/upload/pdf", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileName = nanoid(4) + ".pdf";
  // load the image from the file system in the uploads folder
  const id = await photos.put(fileName, {
    data: file.buffer,
  });
  return res
    .status(200)
    .send({ img_url: `${process.env.HOST_NAME}/api/image/` + id });
});
