import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, SetupScreen, Setup1Screen, Setup2Screen } from "./scenes";
import MealAdder from "./screens/MealAdder";
import PillAdder from "./screens/PillAdder";
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
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Setup1" component={Setup1Screen} />
        <Stack.Screen name="Setup2" component={Setup2Screen} />
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
  Setup1: undefined;
  Setup2: undefined;
};
