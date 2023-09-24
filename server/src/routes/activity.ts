import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getActivities, getSteps } from "../lib/googleFit";
import { getLastSync, saveLastSync } from "../lib/state";

export const activityRouter = Router();

activityRouter.get("/sync", async (req, res) => {
  try {
    const startTime = getLastSync();

    // sync sport activites
    const activities = await getActivities(startTime);
    if (!activities) {
      console.error("unable to fetch activies");
      return res.status(500).send("unable to fetch activies");
    }
    const processedActivites = activities.map((activity) => ({
      recordedAt: new Date(Number(activity.startTime)),
      calories: activity.calories,
      name: activity.activity,
    }));
    const savedAcitives = await prisma.sportActivity.createMany({
      data: processedActivites,
    });

    // sync steps
    const stepRecord = await getSteps();
    if (!stepRecord) {
      console.error("unable to fetch steps");
      return res.status(500).send("unable to fetch steps");
    }

    const justDate = new Date().toISOString().split("T")[0];
    const savedSteps = await prisma.stepsPerDay.upsert({
      where: { date: justDate },
      update: { steps: stepRecord.steps },
      create: { date: justDate, steps: stepRecord.steps },
    });

    saveLastSync();
    return res.send({ message: "synced successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("unable to sync");
  }
});
