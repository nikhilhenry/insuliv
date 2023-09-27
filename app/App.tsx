import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseAdder, Home, MealAdder, PillAdder, Setup } from "./scenes";
import { NavigationContainer } from "@react-navigation/native";
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
