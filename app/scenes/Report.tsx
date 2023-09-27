import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to ReportScreen</Text>
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

export default ReportScreen;