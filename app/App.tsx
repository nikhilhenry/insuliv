import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Home from "./scenes/Home";
import MealAdder from "./screens/MealAdder";
import PillAdder from "./screens/PillAdder";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MealAdder" component={MealAdder} />
        <Stack.Screen name="PillAdder" component={PillAdder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  HomeScreen: undefined;
  ReportScreen: undefined;
  FoodScreen: undefined;
  Settings: undefined;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
