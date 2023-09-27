import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";
const FoodRecom: React.FC<{ res: string }> = ({ res }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primaryBlueL,
          padding: 25,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>
          {res}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    padding: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FoodRecom;
