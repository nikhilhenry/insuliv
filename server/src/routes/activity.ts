import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getActivities, getSteps } from "../lib/googleFit";
import { getLastSync, saveLastSync } from "../lib/state";

export const activityRouter = Router();

activityRouter.get("/sync", async (req, res) => {
  const startTime = getLastSync();
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
  if (savedAcitives.count === processedActivites.length) {
    // save the last sync time
    saveLastSync();
    return res.send({ message: "synced successfully" });
  }
});

activityRouter.get("/sync_steps", async (req, res) => {
  const steps = await getSteps();
});
