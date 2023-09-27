import axios, { AxiosError } from "axios";
import { getAuthToken } from "./getAccessToken";
import { activity_maps } from "./fitActivities";

const fitAPI = axios.create({
  baseURL: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
  headers: { authorization: `Bearer ${await getAuthToken()}` },
});

// data configuaration
let currDate = new Date();
currDate.setHours(23, 59, 59, 999);
const period = 7; // days // @Subham can we change this to 1 day? Do we really need 7 days of data?
const endMillis = currDate.getTime();
const startMillis = endMillis - period * 86400000;
const durationDay = 86400000;

export const getActivities = async (startTime: Date | null) => {
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
      startTimeMillis: startTime?.getTime() || startMillis,
      endTimeMillis: endMillis,
      bucketByActivitySegment: {
        minDurationMillis: 600000, // @Subham if I increase this value will it club more a
      },
    });

    const data = result.data.bucket;

    const filteredData = data.map((item: any) => {
      return {
        startTime: item.startTimeMillis,
        endTime: item.endTimeMillis,
        calories: Math.round(item.dataset[0].point[0].value[0].fpVal),
        activity: activity_maps[item.activity] || "Unknown",
      };
    });

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
        durationMillis: 86400000, // @ Subham will this get us today's steps also?
      },
      startTimeMillis: new Date().setHours(0, 0, 0, 0),
      endTimeMillis: endMillis,
    });

    const data = result.data.bucket;

    const filteredData = data.map((item: any) => {
      return {
        startTime: new Date(Number(item.startTimeMillis)),
        steps:
          item["dataset"][0]["point"].length > 0
            ? Math.round(item["dataset"][0]["point"][0]["value"][0]["intVal"])
            : 0,
      };
    });

    return filteredData.pop() as { startTime: Date; steps: number };
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data);
  }
};

export const getCalories = async () => {
  let data = [];
  try {
    const result: any = await fitAPI.post("", {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
          dataSourceId:
            "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended",
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      startTimeMillis: startMillis,
      endTimeMillis: endMillis,
    });
    const data = result.data.bucket;
    console.log(data[0].dataset[0].point[0].value[0].fpVal);
    const send_data = [];
    const cleanedData = result.data.bucket.map((item: any) => {
      try {
        return {
          startTime: new Date(Number(item.startTimeMillis)),
          endTime: new Date(Number(item.endTimeMillis)),
          calories: Math.round(item.dataset[0].point[0].value[0].fpVal),
        };
      } catch (error) {
        return {
          startTime: new Date(Number(item.startTimeMillis)),
          endTime: new Date(Number(item.endTimeMillis)),
          calories: 1671,
        };
      }
    });

    return cleanedData;

    let categorizedData: any = [];
    send_data.forEach((dataPoint: any) => {
      // Convert startTime to a Date object
      const startTimeMs = dataPoint.startTime;
      const startDate = new Date(Number(startTimeMs));

      // Get the date and day
      const date = startDate.toISOString().split("T")[0];
      const day = startDate.toLocaleDateString("en-US", { weekday: "long" });

      // Add date and day to the data point
      dataPoint.date = date;
      dataPoint.day = day;

      // Add the data point to the categorized object

      categorizedData.push(dataPoint);
    });

    // Convert the categorized data to JSON
    return categorizedData as Array<{
      startTime: string;
      endTime: string;
      calories: Number;
      date: string;
      day: string;
    }>;
  } catch (e) {
    console.log(e);
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
        for (const point of upper.point) {
          for (const val of point.value) {
            send_data.push(val.fpVal);
          }
        }
      }
    }

    return send_data.pop() as number;
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data);
  }
};
