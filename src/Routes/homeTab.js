import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "./homeStack";
import CreatePost from "../posts/createPost";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeTabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "News Feed") {
              iconName = focused ? "ios-home" : "md-home";
            } else if (route.name === "create") {
              iconName = focused ? "ios-add" : "ios-add-circle";
            } else if (route.name === "chat") {
              iconName = focused ? "ios-chatbubbles" : "md-chatbubbles";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="News Feed" component={HomeStack} />
        <Tab.Screen name="create" component={CreatePost} />
        <Tab.Screen name="chat" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
