import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getActivities } from "../lib/googleFit";

export const activityRouter = Router();

activityRouter.get("/sync", async (req, res) => {
  const activities = await getActivities();
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
    return res.send({ message: "synced successfully" });
  }
});
