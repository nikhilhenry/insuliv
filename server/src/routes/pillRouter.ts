import { Router } from "express";
import { prisma } from "../lib/prisma";
import { allowedNodeEnvironmentFlags } from "process";

export const pillRouter = Router();

pillRouter.get("/", async (req, res, next) => {
  const pillLog = await prisma.pillActivity.findMany();
  return res.json(pillLog);
});

pillRouter.post("/", async (req, res, next) => {
  try {
    const pill = await prisma.pillActivity.create({
      data: req.body,
    });
    res.json(pill);
  } catch (error) {
    next(error);
  }
});

pillRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPill = await prisma.pillActivity.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedPill);
  } catch (error) {
    next(error);
  }
});
