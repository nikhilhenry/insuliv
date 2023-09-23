import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../scenes/Home";
import { COLORS, SIZES } from "../constants";
import { InfoCardContainer, ActivityLogger } from "../components";
import Icon from "react-native-vector-icons/Fontisto";

const HomeScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 40,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.xLarge,
            color: COLORS.darkL,
            fontWeight: "bold",
          }}
        >
          Hey User 👋,
        </Text>
        <TouchableOpacity>
          <Icon name="bell" size={27} color={COLORS.IconColor} />
        </TouchableOpacity>
      </View>
      <InfoCardContainer />
      <ActivityLogger navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.backGray,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
