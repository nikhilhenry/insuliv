import "dotenv/config";
import { getActivities, getBPM, getSteps } from "./googleFit";
import { getAuthToken } from "./getAccessToken";

console.log(await getBPM());
