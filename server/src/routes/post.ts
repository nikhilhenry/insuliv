import { Router } from "express";
import { prisma } from "../lib/prisma";

export const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const post = await prisma.post.findMany();
  return res.json(post);
});

postRouter.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });
  const post = await prisma.post.create({ data: { message } });
  return res.json(post);
});
