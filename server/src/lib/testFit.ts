import "dotenv/config";
import { getActivities, getBPM, getCalories, getSteps } from "./googleFit";
import { getAuthToken } from "./getAccessToken";
import { getLastSync, saveLastSync } from "./state";

// const activities = await getActivities();
// console.log(activities?.length);
// console.log(activities);

console.log(await getCalories());
// console.log(activities[0]);
// const date = new Date(Number(activities[0].startTime));
// console.log(date.toLocaleDateString());

// console.log(await getBPM());

// console.log(getLastSync());
// saveLastSync();
// console.log(getLastSync());
