import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./scenes/Home";
import MealAdder from "./screens/MealAdder";
import PillAdder from "./screens/PillAdder";
import Setup from "./scenes/Setup";
import ExerciseAdder from "./screens/ExerciseAdder";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Setup"
        screenOptions={({ route }) => {
          return {
            headerShown:
              route.name == "Setup" || route.name == "Home" ? false : true,
          };
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="MealAdder" component={MealAdder} />
        <Stack.Screen name="ExerciseAdder" component={ExerciseAdder} />
        <Stack.Screen name="PillAdder" component={PillAdder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  MealAdder: undefined;
  ExerciseAdder: undefined;
  PillAdder: undefined;
};
