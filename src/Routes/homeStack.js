import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import homeScreen from "../Screens/homeScreen";
import ViewPost from "./../posts/viewPost";
import { View, Text } from "react-native";
import UserProfile from "../Screens/userProfile";
import FirebaseStorageUploader from "../Screens/uploadImage";
import ListUploads from "../Screens/listUploads";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="News Feed">
      <Stack.Screen name="News Feed" component={homeScreen} />
      <Stack.Screen name="logout" component={LogOut} />
      <Stack.Screen name="ViewPost" component={ViewPost} />
      <Stack.Screen name="user profile" component={UserProfile} />
      <Stack.Screen name="imageUpload" component={FirebaseStorageUploader} />
      <Stack.Screen name="listUpload" component={ListUploads} />
    </Stack.Navigator>
  );
}

function LogOut() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LogOut</Text>
    </View>
  );
}
