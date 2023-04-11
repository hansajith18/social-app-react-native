import React from "react";
import { Provider, useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import store, { rrfProps } from "./src/Store/store";
import Main from "./main";
import { View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as Font from "expo-font";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      ...Ionicons.font,
      ...MaterialIcons.font,
      ...MaterialCommunityIcons.font,
      ...AntDesign.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <SplashScreen />;
    }

    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <Main />
          </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <SplashScreen />;
  return children;
}

function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2575fc",
      }}
    >
      <View>
        <Image
          source={require("./assets/logo.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <ActivityIndicator animating={true} color="white" />
    </View>
  );
}
