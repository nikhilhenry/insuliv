import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import RecomCard from "../components/RecomCard";

const FoodRecom = () => {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    apifetcher();
  }, []);
  const apifetcher = async () => {
    try {
      const result = await fetch(
        "https://apollo-web-th7i.onrender.com/api/food/last"
      );
      const epic = await result.json();
      const res = await fetch(
        `https://insuliv-backend.onrender.com/recommend?food=${encodeURI(
          epic.Name
        )}}`
      );
      const fetchdata = await res.json();
      console.log;
      setData(fetchdata.response);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {data ? (
        <RecomCard res={data} />
      ) : (
        <Text className="text-center">Loading</Text>
      )}
    </>
  );
};

export default FoodRecom;
