import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Linking,
  Pressable,
} from "react-native";
import { COLORS } from "../constants";

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={{
          backgroundColor: COLORS.secondaryBlueD,
          padding: 15,
          borderRadius: 8,
        }}
        onPress={() => {
          loadInBrowser();
        }}
      >
        <Text
          style={{ fontSize: 18, color: COLORS.backGray, fontWeight: "bold" }}
        >
          Generate Report
        </Text>
      </Pressable>
    </View>
  );
};

const loadInBrowser = async () => {
  const res = await fetch("https://insuliv-testimg2.onrender.com/report");
  console.log(res);
  const result = await res.json();
  Linking.openURL(result.url).catch((err) =>
    console.error("Couldn't load page", err)
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
