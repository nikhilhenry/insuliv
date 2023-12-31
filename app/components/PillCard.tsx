import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { COLORS } from "../constants";
const PillCard = (pill: any) => {
  const date = new Date(pill.pill.createdAt).toDateString();
  const pillname = pill.pill.name;
  const changepill = async (pillname: string) => {
    await fetch("https://apollo-web-th7i.onrender.com/api/pill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pillname,
      }),
    });
    Alert.alert("Pill Taken! ");
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primaryBlueL,
          padding: 25,
          borderRadius: 10,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "justify" }}
          >
            {pill.pill.name}
          </Text>
          <Text
            style={{ fontSize: 12, fontWeight: "600", textAlign: "justify" }}
          >
            {date}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: COLORS.primaryGreenD,
            borderRadius: 8,
            padding: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            changepill(pillname);
          }}
        >
          <Text style={{ color: COLORS.backGray }}>Take Pill</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default PillCard;
