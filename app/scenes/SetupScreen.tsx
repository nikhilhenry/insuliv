import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { RootStackParamList } from "../App";
import { COLORS } from "../constants";

const SetupScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: COLORS.lightGray }}>
        Live the sweet life with
      </Text>
      <Text style={{ fontSize: 75, color: COLORS.lightGray }}>Insuliv</Text>
      <Pressable
        onPress={() => {
          navigation.push("Setup1");
        }}
        style={{
          backgroundColor: COLORS.lightGray,
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: COLORS.dark, fontSize: 20 }}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBlueD,
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
