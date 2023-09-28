
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import FoodRecom from "../components/FoodRecom";
import { COLORS } from "../constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const FoodScreen = () => {
  const queryClient = new QueryClient();
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Food recommender
        </Text>
        <QueryClientProvider client={queryClient}>
          <FoodRecom />
        </QueryClientProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGray,
    alignItems: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FoodScreen;
