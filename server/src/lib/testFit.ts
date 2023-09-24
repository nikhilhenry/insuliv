import "dotenv/config";
import { getActivities, getBPM, getSteps } from "./googleFit";
import { getAuthToken } from "./getAccessToken";

const activities = await getActivities();
console.log(activities?.length);
console.log(activities);
// console.log(activities[0]);
// const date = new Date(Number(activities[0].startTime));
// console.log(date.toLocaleDateString());
