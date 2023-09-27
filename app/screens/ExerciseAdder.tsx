import { View, Text, StyleSheet } from "react-native";

const ExerciseAdder = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the ExerciseAdder</Text>
      {/* @todo Abhinav pls add the relevant form */}
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

export default ExerciseAdder;
