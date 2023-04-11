import React, { useState } from "react";
import { Appbar, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { SignOut } from "../Store/Actions/authActions";
import { View, Text } from "react-native";

const Header = (props) => {
  const [isLoginOut, setIsLoginOut] = useState(false);

  const _goBack = () => props.navigation.goBack("");
  const _goProfile = () =>
    props.navigation.navigate("user profile", {
      //uid: props.auth.uid,
      authorId: props.auth.uid,
      authorName: props.profile.firstName + " " + props.profile.lastName,
    });

  const _SignOut = () => {
    setIsLoginOut(true);
    props.SignOut();
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#6a11cb", color: "#fff" }}>
        {props.route.name !== "News Feed" && props.route.name !== "create" ? (
          <Appbar.BackAction onPress={_goBack} />
        ) : (
          <Appbar.Action icon="wechat" color="#fff" />
        )}

        <Appbar.Content title={props.title ? props.title : "WeChat"} />
        <Appbar.Action icon="account-circle" onPress={_goProfile} />
        <Appbar.Action icon="logout" onPress={_SignOut} />
      </Appbar.Header>
      {isLoginOut && (
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#6a11cba9",
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            color="white"
            style={{ paddingTop: 10 }}
            size="large"
          />
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              paddingTop: 10,
            }}
          >
            Loging Out...
          </Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignOut: () => dispatch(SignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
