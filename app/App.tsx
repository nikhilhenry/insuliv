import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import PostsScreen from "./screens/PostsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Posts: undefined;
};
