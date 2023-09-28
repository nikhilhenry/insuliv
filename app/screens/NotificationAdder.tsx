import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../constants";
import axios from "axios";
const NotificationAdder = () => {
  const sendNotif = async () => {
    const res = await axios.post("https://insuliv-backend.onrender.com/call");
    console.log(res);
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => sendNotif()}
        style={{ backgroundColor: COLORS.secondaryBlueD, padding: 10 }}
      >
        <Text style={{ color: COLORS.backGray }}>Give me reminder</Text>
      </Pressable>
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

export default NotificationAdder;
