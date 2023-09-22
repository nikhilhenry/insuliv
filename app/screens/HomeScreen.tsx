import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { COLORS, SIZES } from "../constants";
import { InfoCardContainer, ActivityLogger } from "../components";
import Icon from "react-native-vector-icons/Fontisto";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import setDefaultProps from "react-native-simple-default-props";
SplashScreen.preventAutoHideAsync();

const HomeScreen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    const defaultText = {
      style: [{ fontFamily: "Nunito-Regular" }],
    };
    setDefaultProps(Text, defaultText);
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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
            fontFamily: "Nunito-Bold",
          }}
        >
          Hey User 👋,
        </Text>
        <TouchableOpacity>
          <Icon name="bell" size={27} color={COLORS.IconColor} />
        </TouchableOpacity>
      </View>
      <InfoCardContainer />
      <ActivityLogger />
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
