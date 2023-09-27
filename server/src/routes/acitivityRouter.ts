import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getActivities, getBPM, getSteps } from "../lib/googleFit";
import { getLastSync, saveLastSync } from "../lib/state";

export const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  const timeRange = req.query.range as string;
  if (!timeRange) {
    return res.status(400).send("range is required");
  }
  let startTime: Date = new Date();
  if (timeRange === "today") {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    startTime = date;
  }

  if (timeRange === "yesterday") {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    startTime = date;
  }

  if (timeRange === "week") {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    startTime = date;
  }
  if (timeRange === "month") {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    startTime = date;
  }

  // fetch sport activities

  const sportActivities = await prisma.sportActivity.findMany({
    where: { recordedAt: { gte: startTime } },
    orderBy: { recordedAt: "desc" },
  });

  //fetch food and pills for activities
  const food = await prisma.foodActivity.findMany({
    where: { createdAt: { gte: startTime } },
    orderBy: { createdAt: "desc" },
  });

  const pill = await prisma.pillActivity.findMany({
    where: { createdAt: { gte: startTime } },
    orderBy: { createdAt: "desc" },
  });

  const activities: Array<{
    id: number;
    category: string;
    recordedAt: Date;
    data: string;
  }> = [];

  food.forEach((item) =>
    activities.push({
      id: item.id,
      category: "food",
      recordedAt: item.createdAt,
      data: item.Calories,
    })
  );
  pill.forEach((item) =>
    activities.push({
      id: item.id,
      category: "pill",
      recordedAt: item.createdAt,
      data: item.Quantity?.toString() || "",
    })
  );
  sportActivities.forEach((item) =>
    activities.push({
      id: item.id,
      category: "sports",
      recordedAt: item.recordedAt,
      data: item.calories?.toString(),
    })
  );

  return res.send(
    activities.sort((a, b) => Number(b.recordedAt) - Number(a.recordedAt))
  );
});
