import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

const PostsScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to posts</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      ></Button>
      <StatusBar style="auto" />
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
});

export default PostsScreen;
