import { View, Text, StyleSheet, Button, Image } from "react-native";

const FoodScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
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

export default FoodScreen;
