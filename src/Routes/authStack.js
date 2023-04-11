import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import Login from "../Screens/login";
import SignUp from "../Screens/signup";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="user-login" component={Login} />
        <Stack.Screen name="user-signup" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LogOut() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LogOut</Text>
    </View>
  );
}
