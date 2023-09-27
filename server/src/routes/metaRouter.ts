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

  let startDate;
  let endDate;

  for(let i =7;i>-1;i--){
    startDate = new Date(date.setDate(date.getDate() - i));
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate.setHours(23, 59, 59, 999));

    const foodEatenThatDay = await prisma.foodActivity.findMany({where:{
      createdAt: { gte: startDate, lte: endDate },
    }})

    total_calories_consumed_per_day.push(foodEatenThatDay.reduce((acc,curr)=>acc+Number(curr.Calories),0))
  }

  return_data.push({ category: "Calories", data: total_calories_consumed_per_day });


  var calories = await getCalories();
  var daily_cal:any[] = [];

  calories?.forEach((item) => daily_cal.push(Number(item.calories)));

  return_data.push({ category: "Calories", data: daily_cal });

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
