import "dotenv/config";
import { getActivities, getBPM, getSteps } from "./googleFit";
import { getAuthToken } from "./getAccessToken";
import { getLastSync, saveLastSync } from "./state";

// const activities = await getActivities();
// console.log(activities?.length);
// console.log(activities);

// console.log(await getSteps());
// console.log(activities[0]);
// const date = new Date(Number(activities[0].startTime));
// console.log(date.toLocaleDateString());

console.log(getLastSync());
saveLastSync();
console.log(getLastSync());
