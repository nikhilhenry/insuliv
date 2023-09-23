import "dotenv/config";
import { getActivities, getSteps } from "./googleFit";
import { getAuthToken } from "./getAccessToken";

console.log(await getSteps());
