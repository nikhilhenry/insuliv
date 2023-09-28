import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Linking,
} from "react-native";

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to ReportScreen</Text>
      <Button
        onPress={() => {
          loadInBrowser();
        }}
        title="Generate Report"
      />
    </View>
  );
};

const loadInBrowser = () => {
  Linking.openURL("https://www.africau.edu/images/default/sample.pdf").catch(
    (err) => console.error("Couldn't load page", err)
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
