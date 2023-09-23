import axios from "axios";
import { getAuthToken } from "./getAccessToken";
import { activity_maps } from "./fitActivities";

const fitAPI = axios.create({
  baseURL: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
  headers: { authorization: `Bearer ${await getAuthToken()}` },
});

// data configuaration
let currDate = new Date();
currDate.setHours(23, 59, 59, 999);
const period = 7; // days
const endMillis = currDate.getTime();
const startMillis = endMillis - period * 86400000;
const durationDay = 86400000;

export const getActivities = async () => {
  const result = await fitAPI.post("", {
    aggregateBy: [
      {
        dataTypeName: "com.google.activity_segment",
        dataSourceId:
          "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended",
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    startTimeMillis: startMillis,
    endTimeMillis: endMillis,
    bucketByActivitySegment: {
      minDurationMillis: 10000,
    },
  });

  const data = result.data.bucket;

  const filteredData = data
    .map((item: any) => {
      return {
        startTime: item.startTimeMillis,
        endTime: item.endTimeMillis,
        calories: Math.round(item.dataset[0].point[0].value[0].fpVal),
        activity: activity_maps[item.activity] || "Unknown",
      };
    })
    .reverse();

  return filteredData;
};

export const getSteps = async () => {
  const result = await fitAPI.post("", {
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    startTimeMillis: startMillis,
    endTimeMillis: endMillis,
  });

  const data = result.data.bucket;

  const filteredData = data.map((item: any) => {
    return {
      startTime: item.startTimeMillis,
      endTime: item.endTimeMillis,
      steps:
        item["dataset"][0]["point"].length > 0
          ? Math.round(item["dataset"][0]["point"][0]["value"][0]["intVal"])
          : 0,
    };
  });

  return filteredData;
};
