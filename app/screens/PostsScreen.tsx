import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const PostsScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Text>Welcome to posts</Text>
        <Posts />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        ></Button>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </View>
  );
};

const Posts = () => {
  // Access the client
  const queryClient = useQueryClient();
  // Queries
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const posts: { message: string }[] = await (
        await fetch("http://localhost:3000/api/post")
      ).json();
      return posts;
    },
  });

  return (
    <View>
      {!query.isSuccess ? (
        <Text>Failed to Fetch</Text>
      ) : (
        <FlatList
          data={query.data}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.message}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default PostsScreen;
