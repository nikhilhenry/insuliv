import { Router } from "express";
import { prisma } from "../lib/prisma";
import { getCalories } from "../lib/googleFit";
import { start } from "repl";

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
  date.setHours(0,0,0,0)
  startTime = date;

  const average_Calories = [];
  const return_data = [];

  for(let i=0;i<7;i++){ 
    date.setDate(date.getDate() - i);
    startTime = date;
    const carbs=await prisma.foodActivity.findMany({
      where: {createdAt: { gte: startTime } }
    })

    var sum_calories=0;
    carbs.forEach((item)=>sum_calories+=Number(item.Carbs));
    average_Calories.push(sum_calories/carbs.length);
  }
  return_data.push({category: "Carbs",
  data: average_Calories});


  var calories = await getCalories();
  var daily_cal=[]

  calories?.forEach((item)=>
  daily_cal.push(Number(item.calories))
  )

  return_data.push({category: "Calories",
  data: daily_cal});

  date.setHours(0,0,0,0)
  startTime = date;

  const bpm_per_day=[];

  for(let i=0;i<7;i++)
  {
    date.setDate(date.getDate() - i);
    startTime = date;
    const bpm=await prisma.bPMPerDay.findMany({
      where: {recordedAt: { gte: startTime } }
    });

    bpm_per_day.push(bpm[0].value);
  }

  return_data.push({category: "Heart Rate",
data: bpm_per_day})


  return res.send(return_data);
})
