import { Router } from "express";
import { Deta } from "deta";
import { nanoid } from "nanoid";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const projectKey = process.env.DETA_KEY;
const deta = Deta(projectKey);
const photos = deta.Drive("food");

export const imageRouter = Router();

imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);

  const fileName = nanoid(4) + file?.filename.split(".").pop();

  // load the image from the file system in the uploads folder
  const id = await photos.put(fileName, {
    data: "uploads/" + file?.filename,
  });
  return res
    .status(200)
    .send({ img_url: "http://localhost:3000/api/image" + id });
});
