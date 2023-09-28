import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";
import ActivityCard from "../components/ActivityCard/ActivityCard";
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
        <Text className="text-center">Loading</Text>
      )}
    </>
  );
};

export default ActivityList;
