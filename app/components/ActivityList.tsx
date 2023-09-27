import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";

const ActivityList = () => {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["todos"], queryFn: getActivities });

  return (
    <View>
      {query.isSuccess ? (
        <FlatList
          className=""
          data={query.data}
          renderItem={({ item }) => <Item title={item.category} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>hi</Text>
      )}
    </View>
  );
};

const Item: React.FC<{ title: string }> = ({ title }) => {
  return <Text>{title}</Text>;
};

const getActivities = async () => {
  try {
    const result = await fetch(
      "http://localhost:3000/api/activity/?range=today"
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

    console.log(map);

    return map;
  } catch (error) {
    throw error;
  }
};

export default ActivityList;
