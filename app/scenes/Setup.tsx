import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../App";

const SetupScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text className="text-sky-500">Setup page</Text>
      <Button
        onPress={() => {
          navigation.push("Home");
        }}
        title="Go Home"
      />
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

export default SetupScreen;
