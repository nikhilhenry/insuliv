import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

const Tab = createBottomTabNavigator();
const Home: React.FC<NativeStackScreenProps<RootStackParamList>> = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "FoodScreen") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "ReportScreen") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "SettingsScreen") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = "ios-list";
          }
          return (
            <View>
              <Icon name={iconName} size={30} color={COLORS.IconColor} />
              <Text className="text-sky-500">Home</Text>
            </View>
          );
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: COLORS.backGray,
          tabStyle: { backgroundColor: COLORS.dark },
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.dark,
        tabBarInactiveTintColor: COLORS.darkL,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export type HomeTabParamList = {
  HomeScreen: undefined;
  ReportScreen: undefined;
  FoodScreen: undefined;
  Settings: undefined;
};

export default Home;
