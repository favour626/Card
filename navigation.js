import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from './redux/store';
import Home from "./screens/Home";

const store = configureStore();


export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Home"}
          screenOptions={screenOptions}
        >
          <Stack.Screen name={"Home"} component={Home} />

        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
