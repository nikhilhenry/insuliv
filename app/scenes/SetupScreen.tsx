import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { RootStackParamList } from "../App";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../constants";

const SetupScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: COLORS.lightGray }}>
        Live the sweet life with
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="hands-helping" color={COLORS.lightGray} size={50} />
        <Text style={{ fontSize: 60, color: COLORS.lightGray }}>Insuliv</Text>
      </View>
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
