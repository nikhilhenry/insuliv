import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import React, { useEffect } from "react";
import PillCard from "../components/PillCard";
const PillAdder: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  const [pills, setPills] = React.useState([]);
  const fetchpills = async () => {
    const res = await fetch(
      "https://apollo-web-th7i.onrender.com/api/pill/items"
    );
    const result = await res.json();
    console.log(result);
    setPills(result);
  };
  useEffect(() => {
    fetchpills();
  }, []);
  return (
    <View style={styles.container}>
      {pills ? (
        pills.map((item: any) => {
          return <PillCard pill={item} key={item.id} />;
        })
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default PillAdder;
