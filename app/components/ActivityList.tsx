import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import ActivityCard from "../components/ActivityCard/ActivityCard";
import React, { useEffect } from "react";
const ActivityList: React.FC<{ range: string }> = ({ range }) => {
  const getActivities = async () => {
    try {
      const result = await fetch(
        "https://apollo-web-th7i.onrender.com/api/activity/?range=" + range
      );

      const data = (await result.json()) as Array<{
        category: string;
        recordedAt: Date;
        data: string;
        id: string;
      }>;

      const map = data.map((item, index) => {
        return { ...item, id: index.toString() };
      });

      console.log("activity", map);

      return map;
    } catch (error) {
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["activity-list"],
    queryFn: getActivities,
  });
  return (
    <>
      {query.isSuccess ? (
        <FlatList
          className=""
          data={query.data}
          renderItem={({ item }) => <ActivityCard activity={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default ActivityList;
