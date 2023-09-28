import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RecomCard from "../components/RecomCard";

const FoodRecom = () => {
  const [data, setData] = useState([]);
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
      console.log(fetchdata.response[0]);
      setData(fetchdata.response);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        {data ? (
          data.map((item) => {
            console.log(item);
            return <RecomCard res={item} key={item} />;
          })
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </>
  );
};

export default FoodRecom;
