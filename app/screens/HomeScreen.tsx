import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS, SIZES } from "../constants";
import { InfoCardContainer, ActivityLogger } from "../components";
import Icon from "react-native-vector-icons/Fontisto";
import { HomeTabParamList } from "../scenes/Home";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IconF from "react-native-vector-icons/FontAwesome5";
const queryClient = new QueryClient();

const HomeScreen: React.FC<NativeStackScreenProps<HomeTabParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 40,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <IconF
              name="hands-helping"
              color={COLORS.secondaryBlueD}
              size={30}
            />
            <Text className="font-bold text-3xl" style={{ color: COLORS.dark }}>
              Insuliv
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push("NotificationAdder");
            }}
          >
            <Icon name="bell" size={27} color={COLORS.IconColor} />
          </TouchableOpacity>
        </View>
        <InfoCardContainer />
        <ActivityLogger navigation={navigation} />
        <StatusBar style="auto" />
      </QueryClientProvider>
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
