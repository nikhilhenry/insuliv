import axios from "axios";

export const getAuthToken = async () => {
  try {
    const response = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        grant_type: "refresh_token",
      }
    );
    console.log("token retrived successfully");
    return response.data.access_token;
  } catch (e) {
    console.error(e);
  }
};
