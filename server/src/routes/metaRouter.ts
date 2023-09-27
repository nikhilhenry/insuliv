import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getCalories } from "../lib/googleFit";

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

metaRouter.get("/weekly", async (req, res) => {
  let startTime: Date = new Date();
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  startTime = date;

  const average_Calories = [];
  const return_data = [];

  const total_calories_consumed_per_day = [];

  const startDate = 28;

  for (let i = 6; i > 0; i--) {
    const foodEatenThatDay = await prisma.foodActivity.findMany({
      where: {
        createdAt: {
          gte: new Date(`2023-09-${startDate - i}`),
          lte: new Date(`2023-09-${startDate - i + 1}`),
        },
      },
    });

    console.log(foodEatenThatDay);

    total_calories_consumed_per_day.push(
      foodEatenThatDay.reduce((acc, curr) => acc + Number(curr.Calories), 0)
    );
  }

  return_data.push({
    category: "Calories Consumed",
    data: total_calories_consumed_per_day,
  });

  const calories = await getCalories();
  const daily_cal: any[] = [];

  calories?.forEach((item) => daily_cal.push(Number(item.calories)));

  return_data.push({ category: "Calories Burnt", data: daily_cal });

  date.setHours(0, 0, 0, 0);
  startTime = date;

  const bpm_per_day: any[] = [];

  const bpm = await prisma.bPMPerDay.findMany({
    where: {
      recordedAt: { gte: new Date(date.setDate(date.getDate() - 7)) },
    },
  });

  bpm.forEach((item) => bpm_per_day.push(Number(item.value)));

  return_data.push({ category: "Heart Rate", data: bpm_per_day });

  return res.send(return_data);
});
