import "dotenv/config";
import { getActivities } from "./googleFit";
import { getAuthToken } from "./getAccessToken";

console.log(await getActivities());
