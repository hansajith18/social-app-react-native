import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Appbar, TextInput, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { SignIn } from "../Store/Actions/authActions";

class Login extends Component {
  state = {
    isLoading: false,
  };

  setLoadingIndicator = (loading) => {
    this.setState({
      isLoading: loading,
    });
  };
  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action icon="wechat" />
          <Appbar.Content title="Sign In" />
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#a1c4fd",
          }}
        >
          <Formik
            initialValues={{}}
            onSubmit={(values) => {
              this.setLoadingIndicator(true);
              this.props.SignIn(values, this.setLoadingIndicator);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View
                style={{
                  margin: 10,
                  justifyContent: "center",
                  backgroundColor: "#c2e9fb",
                  padding: 10,
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 2,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 20,
                    height: 1,
                  },
                  shadowOpacity: 2,
                  shadowRadius: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Log In to WeChat
                </Text>
                <View style={{ marginBottom: 5 }}>
                  <TextInput
                    mode="outlined"
                    label="Email or UserName"
                    placeholder="Enter Email Address or user name"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    textContentType="emailAddress"
                  />
                  <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter your Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    textContentType="password"
                    secureTextEntry={true}
                    autoCorrect={false}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: "#6a11cb",
                    padding: 10,
                  }}
                  disabled={this.state.isLoading}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    this.props.authError || this.state.isLoading
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  {this.props.authError && !this.state.isLoading ? (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        paddingTop: 10,
                      }}
                    >
                      {this.props.authError}
                    </Text>
                  ) : (
                    <ActivityIndicator
                      animating={this.state.isLoading}
                      style={{ paddingTop: 10 }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#6a11cb" }}>
                    Don't Have an Account ? {"  "}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("user-signup")
                    }
                  >
                    <Text
                      style={{
                        borderBottomColor: "blue",
                        borderBottomWidth: 1,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.Auth.authLoginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignIn: (credentials, setLoadingIndicator) =>
      dispatch(SignIn(credentials, setLoadingIndicator)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
