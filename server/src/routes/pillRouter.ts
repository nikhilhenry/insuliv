import { Router } from "express";
import { prisma } from "../lib/prisma";
import { allowedNodeEnvironmentFlags } from "process";

export const pillRouter = Router();

pillRouter.get("/", async (req, res, next) => {
  const pillLog = await prisma.pillActivity.findMany();
  return res.json(pillLog);
});

pillRouter.post("/create", (req, res) => {
  console.log(req.body.pills);
  req.body.pills.forEach(async (pill: any) => {
    await prisma.pill.create({ data: { name: pill.name as string } });
  });
  res.json({ message: "Pills created" });
});

pillRouter.get("/items", async (req, res) => {
  try {
    return res.send(await prisma.pill.findMany());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving pills" });
  }
});

pillRouter.post("/", async (req, res, next) => {
  try {
    const pill = await prisma.pillActivity.create({
      data: { Name: req.body.name, Quantity: 1, Category: "essential" },
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
