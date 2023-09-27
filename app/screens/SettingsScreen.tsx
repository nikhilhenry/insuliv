import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../scenes/Home";

const SettingsScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Settings</Text>
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

export default SettingsScreen;
