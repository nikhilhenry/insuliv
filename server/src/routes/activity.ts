import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getActivities, getBPM, getSteps } from "../lib/googleFit";
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

    const justDate = new Date().toISOString().split("T")[0];

    // sync calories
    const calories = activities.reduce((acc, curr) => acc + curr.calories, 0);
    const savedCalories = await prisma.caloriesPerDay.upsert({
      where: { date: justDate },
      update: { value: { increment: calories } },
      create: { date: justDate, value: calories },
    });

    // sync steps
    const stepRecord = await getSteps();
    if (!stepRecord) {
      console.error("unable to fetch steps");
      return res.status(500).send("unable to fetch steps");
    }
    const savedSteps = await prisma.stepsPerDay.upsert({
      where: { date: justDate },
      update: { steps: stepRecord.steps },
      create: { date: justDate, steps: stepRecord.steps },
    });

    // sync bpm
    const bpmRecord = await getBPM();
    if (!bpmRecord) {
      console.error("unable to fetch bpm");
      return res.status(500).send("unable to fetch bpm");
    }
    const savedBPM = await prisma.bPMPerDay.upsert({
      where: { date: justDate },
      update: { value: bpmRecord },
      create: { date: justDate, value: bpmRecord },
    });

    saveLastSync();
    return res.send({ message: "synced successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("unable to sync");
  }
});
