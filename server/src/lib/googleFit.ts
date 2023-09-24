import axios, { AxiosError } from "axios";
import { getAuthToken } from "./getAccessToken";
import { activity_maps } from "./fitActivities";
import { error } from "console";

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
  try {
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
        minDurationMillis: 600000, // @Subham if I increase this value will it club more a
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

    return filteredData as Array<{
      startTime: string;
      endTime: string;
      calories: number;
      activity: string;
    }>;
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data);
  }
};

export const getSteps = async () => {
  try {
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
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data);
  }
};

export const getBPM = async () => {
  try {
    const result = await fitAPI.post("", {
      aggregateBy: [
        {
          dataTypeName: "com.google.heart_rate.bpm",
          dataSourceId:
            "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm",
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      startTimeMillis: endMillis - 3 * durationDay,
      endTimeMillis: endMillis,
    });

    const data = result.data.bucket;

    const send_data = [];
    for (const datapoint of data) {
      for (const upper of datapoint.dataset) {
        console.log(upper);
        for (const point of upper.point) {
          for (const val of point.value) {
            send_data.push(val.fpVal);
          }
        }
      }
    }

    return send_data;
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data);
  }
};
