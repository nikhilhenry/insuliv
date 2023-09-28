import { Router } from "express";
import { Deta } from "deta";
import { nanoid } from "nanoid";
import multer from "multer";
import { writeFileSync } from "fs";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const projectKey = process.env.DETA_KEY;
const deta = Deta(projectKey);
const photos = deta.Drive("food");

export const imageRouter = Router();

imageRouter.post("/upload/string", async (req, res) => {
  try {
    const file: string = req.body.msg;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileName = nanoid(4) + ".png";
    writeFileSync("./" + fileName, file, "base64");
    // read the image
    const fileBuffer = Buffer.from(file, "base64");
    // load the image from the file system in the uploads folder
    const id = await photos.put(fileName, {
      data: fileBuffer,
    });
    console.log("finished putting");
    return res
      .status(200)
      .send({
        img_url: "https://apollo-web-th7i.onrender.com" + "/api/image/" + id,
      });
  } catch (error) {
    console.log(error);
    return res.send({ message: "failed" });
  }
});

imageRouter.get("/pdf/:id", async (req, res) => {
  const id = req.params.id;
  const img = await photos.get(id);
  if (!img) {
    return res.status(404).json({ message: "Image not found" });
  }
  res.contentType("application/pdf");
  const imgData = await img.arrayBuffer();
  return res.end(Buffer.from(imgData), "binary");
});

imageRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const img = await photos.get(id);
  if (!img) {
    return res.status(404).json({ message: "Image not found" });
  }
  res.contentType("png");
  const imgData = await img.arrayBuffer();
  return res.end(Buffer.from(imgData), "binary");
});

imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log("i am recieveing");
    console.log(file);
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
  } catch (error) {
    console.log(error);
    res.send({ message: "failed" });
  }
});

imageRouter.post("/pdf/upload", upload.single("file"), async (req, res) => {
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
    .send({ img_url: `${process.env.HOST_NAME}/api/image/pdf/` + id });
});
