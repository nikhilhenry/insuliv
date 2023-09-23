import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FoodScreen from "../screens/FoodScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";
import ReportScreen from "../screens/ReportScreen";

const Tab = createBottomTabNavigator();
const Home: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
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
          return <Icon name={iconName} size={30} color={COLORS.IconColor} />;
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
      <Tab.Screen name="FoodScreen" component={FoodScreen} />
      <Tab.Screen name="ReportScreen" component={ReportScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export type RootStackParamList = {
  HomeScreen: undefined;
  ReportScreen: undefined;
  FoodScreen: undefined;
  Settings: undefined;
};

export default Home;
