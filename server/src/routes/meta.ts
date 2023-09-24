import { Router } from "express";
import { prisma } from "../lib/prisma";

export const metaRouter = Router();

metaRouter.get("/summary", async (req, res) => {
  // fetch all data from db
  const heartRate = (await prisma.bPMPerDay.findMany({ take: -1 }))[0];
  const stepRecord = (await prisma.stepsPerDay.findMany({ take: -1 }))[0];
  const bloodSugar = 122; // @todo fetch this value from python
  const pills = 2; //@todo fetch this value from pills table

  return res.send({
    heartRate: heartRate.value,
    steps: stepRecord.steps,
    bloodSugar,
    pills,
  });
});
