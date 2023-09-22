import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import PostsScreen from "./screens/PostsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FoodScreen from "./screens/FoodScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "./constants";
import ReportScreen from "./screens/ReportScreen";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Posts") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Food") {
              iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (route.name === "Report") {
              iconName = focused ? "document-text" : "document-text-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = "ios-list";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={26} color={COLORS.IconColor} />;
          },
          tabBarStyle: {
            height: 60,
            backgroundColor: COLORS.backGray,
            tabStyle: { backgroundColor: COLORS.dark },
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.dark,
          tabBarInactiveTintColor: COLORS.darkL,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Posts" component={PostsScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Food" component={FoodScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Posts: undefined;
};
